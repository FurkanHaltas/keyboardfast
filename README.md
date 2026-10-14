# keyboardfast

A clean, fast typing speed test — multilingual, with a code mode and progress tracking.

## Features

- **Modes:** time (15/30/60/120 s), words (10/25/50/100) and **code** (JavaScript, TypeScript, Python, Go, Rust, Java, C, SQL) with auto-skipped indentation.
- **Detailed results:** net & raw WPM, accuracy, consistency, per-second speed chart with error marks, correct/incorrect/extra/missed characters, keys to practise, accuracy by character type (letters, digits, symbols, whitespace).
- **Progress:** every result is compared with your history in the same mode (personal best, average); a progress page charts WPM and accuracy over time.
- **Languages:** interface in English, Türkçe, Deutsch, Español, Français, Português; typing word lists in the same six languages.
- **Themes:** six built-in themes, applied before first paint.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · zustand · Vitest

The typing engine (`src/engine`) is framework-agnostic TypeScript with unit tests.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # engine unit tests
npm run lint
npm run build
```

## Roadmap

- Accounts and synced history (Supabase)
- Leaderboards with server-side result validation
- Personal practice drills generated from weak keys
- Real-time races
