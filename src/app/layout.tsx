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
    icon: 'https://s3.us-west-2.amazonaws.com/zime.ai-website-asset/logo/zime-coral-black.png',
    shortcut: 'https://s3.us-west-2.amazonaws.com/zime.ai-website-asset/logo/zime-coral-black.png',
    apple: 'https://s3.us-west-2.amazonaws.com/zime.ai-website-asset/logo/zime-coral-black.png',
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
