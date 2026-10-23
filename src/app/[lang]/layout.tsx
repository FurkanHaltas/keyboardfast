import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InlineScript } from "@/components/InlineScript";
import { SettingsBoot } from "@/components/SettingsBoot";
import { getDictionary, isLocale, LOCALES } from "@/i18n/config";
import { I18nProvider } from "@/i18n/I18nProvider";
import { SITE_URL } from "@/lib/site";
import { SETTINGS_KEY } from "@/lib/storageKeys";
import "../globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin", "latin-ext"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin", "latin-ext"] });

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = await getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.title, template: `%s · keyboardfast` },
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
    },
    openGraph: { title: t.meta.title, description: t.meta.description, siteName: "keyboardfast", locale: lang },
  };
}

export const viewport: Viewport = {
  themeColor: "#111317",
};

// Runs before first paint so a saved theme never flashes the default one.
const themeScript = `try{var s=JSON.parse(localStorage.getItem(${JSON.stringify(SETTINGS_KEY)})||"{}");var t=s.state&&s.state.theme;if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} data-theme="night" suppressHydrationWarning className={`${geist.variable} ${mono.variable} antialiased`}>
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body className="min-h-dvh">
        <I18nProvider locale={lang} dict={dict}>
          <SettingsBoot />
          <div className="mx-auto flex min-h-dvh w-full max-w-[1100px] flex-col px-4 sm:px-8">
            <Header />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
