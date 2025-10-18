import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/shared/header';
import { AIAssistant } from '@/components/ai-assistant';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ZIME Insights',
  description: 'AI-Powered Sales Pipeline Dashboard',
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' stroke='%23FF6B4A' stroke-width='6' fill='none'/%3E%3Ccircle cx='50' cy='50' r='30' stroke='%23FF6B4A' stroke-width='6' fill='none'/%3E%3Ccircle cx='50' cy='50' r='15' fill='%23FF6B4A'/%3E%3Cpath d='M62 38L50 50L54 54L66 42Z' fill='%234CAF50'/%3E%3C/svg%3E",
    shortcut: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' stroke='%23FF6B4A' stroke-width='6' fill='none'/%3E%3Ccircle cx='50' cy='50' r='30' stroke='%23FF6B4A' stroke-width='6' fill='none'/%3E%3Ccircle cx='50' cy='50' r='15' fill='%23FF6B4A'/%3E%3Cpath d='M62 38L50 50L54 54L66 42Z' fill='%234CAF50'/%3E%3C/svg%3E",
    apple: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' stroke='%23FF6B4A' stroke-width='6' fill='none'/%3E%3Ccircle cx='50' cy='50' r='30' stroke='%23FF6B4A' stroke-width='6' fill='none'/%3E%3Ccircle cx='50' cy='50' r='15' fill='%23FF6B4A'/%3E%3Cpath d='M62 38L50 50L54 54L66 42Z' fill='%234CAF50'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className="font-body antialiased bg-bg-page text-text-primary"
        suppressHydrationWarning
      >
        <Header />
        <main>{children}</main>
        <AIAssistant />
        <Toaster />
      </body>
    </html>
  );
}
