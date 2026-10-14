import { buildResult, countWpmChars } from "./stats";
import type { Keystroke, SecondSample, TestResult, Word } from "./types";

export type TestLimit =
  | { kind: "time"; seconds: number }
  /** finishes when the last word is completed */
  | { kind: "words" };

export type EngineStatus = "idle" | "running" | "finished";

const MAX_EXTRA = 12;
const REFILL_THRESHOLD = 40;

export interface EngineOptions {
  words: Word[];
  limit: TestLimit;
  /** supplies more words in time mode as the user approaches the end */
  more?: () => Word[];
}

/**
 * Framework-agnostic typing test state machine. All timestamps come from the caller
 * (`performance.now()` in the browser) so the engine is deterministic under test.
 */
export class TypingEngine {
  words: Word[];
  typed: string[];
  index = 0;
  status: EngineStatus = "idle";
  startedAt = 0;
  finishedAt = 0;
  strokes: Keystroke[] = [];
  samples: SecondSample[] = [];
  result: TestResult | null = null;
  /** increments on every state change; drives useSyncExternalStore */
  version = 0;

  private readonly limit: TestLimit;
  private readonly more?: () => Word[];
  private listeners = new Set<() => void>();

  constructor(opts: EngineOptions) {
    this.words = opts.words;
    this.typed = opts.words.map(() => "");
    this.limit = opts.limit;
    this.more = opts.more;
  }

  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  };

  getVersion = () => this.version;

  private emit() {
    this.version++;
    this.listeners.forEach((l) => l());
  }

  get elapsed() {
    return this.status === "idle" ? 0 : (this.status === "finished" ? this.finishedAt : this.lastNow) - this.startedAt;
  }

  private lastNow = 0;

  /** Feed a typed character. Spaces and "\n" act as word separators. */
  input(ch: string, now: number) {
    if (this.status === "finished") return;
    if (this.status === "idle") {
      if (ch === " " || ch === "\n") return; // a stray separator shouldn't start the clock
      this.status = "running";
      this.startedAt = now;
    }
    this.lastNow = now;
    if (this.checkTime(now)) return;

    if (ch === " " || ch === "\n") this.separate(ch, now);
    else this.append(ch, now);
    this.logNet(now);
    this.emit();
  }

  /**
   * Net-WPM characters after each change, so per-second samples reflect what was typed
   * at that moment even if ticks arrive late (e.g. a throttled background tab).
   */
  private netLog: { t: number; net: number }[] = [];

  private logNet(now: number) {
    if (this.status === "idle") return;
    this.netLog.push({ t: now - this.startedAt, net: countWpmChars(this.words, this.typed, this.index) });
  }

  private netAt(t: number) {
    for (let i = this.netLog.length - 1; i >= 0; i--) if (this.netLog[i].t <= t) return this.netLog[i].net;
    return 0;
  }

  private append(ch: string, now: number) {
    const word = this.words[this.index];
    const cur = this.typed[this.index];
    if (cur.length >= word.text.length + MAX_EXTRA) return;
    const expected = word.text[cur.length] ?? "";
    this.strokes.push({ t: now - this.startedAt, expected, typed: ch, correct: expected === ch });
    this.typed[this.index] = cur + ch;

    const isLast = this.index === this.words.length - 1;
    if (isLast && this.limit.kind === "words" && this.typed[this.index] === word.text) this.finish(now);
  }

  private separate(key: " " | "\n", now: number) {
    const word = this.words[this.index];
    if (this.typed[this.index].length === 0) return;
    this.strokes.push({ t: now - this.startedAt, expected: word.sep, typed: key, correct: key === word.sep });

    if (this.index === this.words.length - 1) {
      this.finish(now);
      return;
    }
    this.index++;
    if (this.more && this.words.length - this.index < REFILL_THRESHOLD) {
      const extra = this.more();
      this.words = this.words.concat(extra);
      this.typed = this.typed.concat(extra.map(() => ""));
    }
  }

  backspace(wholeWord: boolean, now: number) {
    if (this.status !== "running") return;
    this.lastNow = now;
    if (this.checkTime(now)) return;
    const cur = this.typed[this.index];
    if (cur.length > 0) {
      this.typed[this.index] = wholeWord ? "" : cur.slice(0, -1);
    } else if (this.index > 0 && this.typed[this.index - 1] !== this.words[this.index - 1].text) {
      // Only allow stepping back into a word that still has mistakes.
      this.index--;
      if (wholeWord) this.typed[this.index] = "";
    } else return;
    this.logNet(now);
    this.emit();
  }

  /** Call periodically (e.g. every animation frame); records per-second samples and ends timed tests. */
  tick(now: number) {
    if (this.status !== "running") return;
    this.lastNow = now;
    const before = this.samples.length;
    if (!this.checkTime(now)) this.sampleUntil(now - this.startedAt);
    if (this.samples.length !== before) this.emit();
  }

  /** @returns true when the test ended because time ran out */
  private checkTime(now: number) {
    if (this.limit.kind !== "time") return false;
    const end = this.startedAt + this.limit.seconds * 1000;
    if (now < end) return false;
    this.finish(end);
    this.emit();
    return true;
  }

  private sampleUntil(elapsedMs: number) {
    while ((this.samples.length + 1) * 1000 <= elapsedMs) {
      this.pushSample(1000);
    }
  }

  private pushSample(windowMs: number) {
    const startT = this.samples.length * 1000;
    const endT = startT + windowMs;
    let count = 0;
    let errors = 0;
    for (const s of this.strokes) {
      // The very first keystroke lands exactly at t=0 and belongs to second 1.
      if ((s.t > startT || (startT === 0 && s.t === 0)) && s.t <= endT) {
        count++;
        if (!s.correct) errors++;
      }
    }
    this.samples.push({
      second: Math.round(endT / 10) / 100,
      wpm: Math.round(this.netAt(endT) / 5 / (endT / 60000)),
      raw: Math.round(count / 5 / (windowMs / 60000)),
      errors,
    });
  }

  private finish(now: number) {
    if (this.status === "finished") return;
    this.logNet(now);
    this.status = "finished";
    this.finishedAt = now;
    const elapsed = now - this.startedAt;
    this.sampleUntil(elapsed);
    const rest = elapsed - this.samples.length * 1000;
    // Keep a trailing partial second only if it is long enough to be meaningful.
    if (rest >= 250) this.pushSample(rest);
    this.result = buildResult({
      words: this.words,
      typed: this.typed,
      index: this.index,
      strokes: this.strokes,
      samples: this.samples,
      durationMs: elapsed,
    });
  }
}
