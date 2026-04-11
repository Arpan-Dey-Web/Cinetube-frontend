import type { Metadata } from "next";
import { Nunito, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // We use Inter for the base sans font
});

export const metadata: Metadata = {
  title: {
    default: "Flicks | Movie Rating & Streaming Portal",
    template: "%s | Flicks",
  },
  description:
    "Explore movies, review titles, manage watchlists, and moderate cinematic communities with Flicks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${nunito.variable} ${inter.variable}`}
    >
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
