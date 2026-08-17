import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import NavProgress from "@/components/motion/NavProgress";
import IntroCurtain from "@/components/motion/IntroCurtain";
import MotionProvider from "@/components/motion/MotionProvider";
import { MotionPreferenceProvider } from "@/components/motion/MotionPreference";
import VoyageBackground from "@/components/voyage/VoyageBackground";
import JsonLd from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";

/**
 * Resolves the motion preference before first paint, the same way
 * next-themes avoids a theme flash. Without this, reduced-motion visitors
 * would see one frame of full animation on every navigation.
 */
const MOTION_BOOTSTRAP = `
(function(){try{
  var o=localStorage.getItem('motion-preference');
  var r=o?o==='reduced':matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.dataset.motion=r?'reduced':'full';
}catch(e){document.documentElement.dataset.motion='full';}})();
`;
import { profile } from "@/content/profile";
import { site } from "@/content/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${profile.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: profile.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF6EF" },
    { media: "(prefers-color-scheme: dark)", color: "#060B14" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${mono.variable}`}
      data-motion="full"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOTSTRAP }} />
        <JsonLd />
      </head>
      <body className="font-sans">
        <IntroCurtain />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
        <MotionPreferenceProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4
                       focus:z-[100] focus:rounded-md focus:bg-primary
                       focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>

          <MotionProvider>
            <SmoothScroll />
            <ScrollProgress />
            <NavProgress />

            {/* one continuous scene behind every page */}
            <VoyageBackground />

            <Header />
            {/* positioned: framer's useScroll warns when a scroll target's
                offset parent is static */}
            <main id="main" className="relative">
              {children}
            </main>
            <Footer />
          </MotionProvider>
        </MotionPreferenceProvider>
        </ThemeProvider>

        {/* Outside the providers: it renders nothing, and it should keep
            reporting even if something above it throws. Only sends data
            from a Vercel deployment — in dev it just logs to the console. */}
        <Analytics />
      </body>
    </html>
  );
}
