import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Transer Central - Admin Dashboard',
  description: 'Video content management for Transer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
