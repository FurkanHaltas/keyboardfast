import type { Metadata } from "next";
import { LeaderboardView } from "@/components/leaderboard/LeaderboardView";
import { getDictionary, isLocale } from "@/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[lang]/leaderboard">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = await getDictionary(lang);
  return { title: t.leaderboard.title, description: t.leaderboard.subtitle };
}

export default function LeaderboardPage() {
  return <LeaderboardView />;
}
