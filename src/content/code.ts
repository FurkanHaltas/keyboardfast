/** Short, original, idiomatic snippets. Indentation is auto-skipped while typing. */
const snippets = {
  javascript: [
    `function debounce(fn, wait = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}`,
    `const groupBy = (items, key) =>
  items.reduce((acc, item) => {
    const k = item[key];
    (acc[k] ||= []).push(item);
    return acc;
  }, {});`,
    `async function fetchJson(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url);
    if (res.ok) return res.json();
    await new Promise((r) => setTimeout(r, 2 ** i * 100));
  }
  throw new Error(\`Failed: \${url}\`);
}`,
    `export function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}`,
  ],
  typescript: [
    `interface User {
  id: number;
  name: string;
  email?: string;
}

function findUser(users: User[], id: number): User | undefined {
  return users.find((u) => u.id === id);
}`,
    `type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function safeParse(json: string): Result<unknown> {
  try {
    return { ok: true, value: JSON.parse(json) };
  } catch (e) {
    return { ok: false, error: e as Error };
  }
}`,
    `class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}`,
    `const sum = (xs: readonly number[]): number =>
  xs.reduce((a, b) => a + b, 0);

export const average = (xs: number[]) =>
  xs.length === 0 ? 0 : sum(xs) / xs.length;`,
  ],
  python: [
    `def fibonacci(n: int) -> list[int]:
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]`,
    `from collections import Counter

def top_words(text, k=5):
    words = text.lower().split()
    return Counter(words).most_common(k)`,
    `class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("amount must be positive")
        self.balance += amount`,
    `with open("data.csv") as f:
    rows = [line.strip().split(",") for line in f]
    total = sum(float(r[2]) for r in rows[1:])
print(f"total: {total:.2f}")`,
  ],
  go: [
    `func reverse(s string) string {
	r := []rune(s)
	for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
		r[i], r[j] = r[j], r[i]
	}
	return string(r)
}`,
    `type Server struct {
	Addr string
	mux  *http.ServeMux
}

func (s *Server) Start() error {
	log.Printf("listening on %s", s.Addr)
	return http.ListenAndServe(s.Addr, s.mux)
}`,
    `func worker(jobs <-chan int, results chan<- int) {
	for j := range jobs {
		results <- j * j
	}
}`,
  ],
  rust: [
    `fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut max = list[0];
    for &item in list {
        if item > max {
            max = item;
        }
    }
    max
}`,
    `#[derive(Debug, Clone)]
struct Point {
    x: f64,
    y: f64,
}

impl Point {
    fn distance(&self, other: &Point) -> f64 {
        ((self.x - other.x).powi(2) + (self.y - other.y).powi(2)).sqrt()
    }
}`,
    `fn parse_port(s: &str) -> Result<u16, String> {
    s.parse::<u16>()
        .map_err(|e| format!("invalid port {}: {}", s, e))
}`,
  ],
  java: [
    `public static boolean isPalindrome(String s) {
    int i = 0, j = s.length() - 1;
    while (i < j) {
        if (s.charAt(i++) != s.charAt(j--)) {
            return false;
        }
    }
    return true;
}`,
    `List<String> names = users.stream()
    .filter(u -> u.isActive())
    .map(User::getName)
    .sorted()
    .collect(Collectors.toList());`,
    `@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Point)) return false;
    Point p = (Point) o;
    return x == p.x && y == p.y;
}`,
  ],
  c: [
    `int binary_search(const int *a, int n, int key) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] == key) return mid;
        if (a[mid] < key) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
    `typedef struct Node {
    int value;
    struct Node *next;
} Node;

Node *push(Node *head, int value) {
    Node *n = malloc(sizeof(Node));
    n->value = value;
    n->next = head;
    return n;
}`,
  ],
  sql: [
    `SELECT c.name, COUNT(o.id) AS orders
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE c.created_at >= '2024-01-01'
GROUP BY c.name
HAVING COUNT(o.id) > 3
ORDER BY orders DESC;`,
    `CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  wpm NUMERIC(5, 1) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);`,
    `UPDATE products
SET price = price * 1.1
WHERE category = 'books' AND stock > 0;`,
  ],
} as const;

export type CodeLanguage = keyof typeof snippets;
export const CODE_LANGUAGES = Object.keys(snippets) as CodeLanguage[];

export const CODE_LANGUAGE_NAMES: Record<CodeLanguage, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  go: "Go",
  rust: "Rust",
  java: "Java",
  c: "C",
  sql: "SQL",
};

/** Picks a random snippet, avoiding an immediate repeat of `previous`. */
export function pickSnippet(lang: CodeLanguage, previous?: string): string {
  const list: readonly string[] = snippets[lang];
  const options = list.length > 1 ? list.filter((s) => s !== previous) : list;
  return options[Math.floor(Math.random() * options.length)];
}
