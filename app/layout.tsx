import type { Metadata } from 'next';
import { inter, spaceGrotesk } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Thế Vietsub - Phim Hệ Thống & Tu Tiên',
  description: 'Nền tảng xem phim hoạt hình Trung Quốc 2D chuyên dòng Hệ Thống, Tu Tiên, Trọng Sinh. Cập nhật mới nhất từ Thế Vietsub.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://raw.githubusercontent.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
      </head>
      <body suppressHydrationWarning className="bg-zinc-950 text-zinc-50 antialiased selection:bg-red-500/30 selection:text-red-200">
        {children}
      </body>
    </html>
  );
}
