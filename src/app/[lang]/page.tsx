import type { Metadata } from "next";
import { TypingTest } from "@/components/test/TypingTest";
import { pageMetadata } from "@/lib/pageMetadata";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  // Title, description and Open Graph text come from the layout; only the URLs are page-specific.
  return { alternates: pageMetadata(lang, "").alternates };
}

export default function Home() {
  return <TypingTest />;
}
