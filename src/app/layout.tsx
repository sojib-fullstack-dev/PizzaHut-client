import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/Footer/footer';
import { SavedItemsProvider } from '@/components/saved-items/saved-items-provider';
import { JwtAuthSync } from '@/app/components/JwtAuthSync';
import { Bounce, ToastContainer } from 'react-toastify';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PizzaHut - Hot & Fresh Pizza Delivered to Your Door',
  description:
    'Order delicious pizza from the best local restaurants. Fast delivery, fresh ingredients, and easy online ordering with PizzaHub.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <SavedItemsProvider>
          {/* Session er sathe JWT token sync (login e naoya, logout e clear) */}
          <JwtAuthSync />
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <ToastContainer
            position="top-center"
            autoClose={1500}
            transition={Bounce}
            toastStyle={{
              background: '#fffaf2',
              color: '#3d211a',
              border: '1px solid rgba(164, 22, 26, 0.25)',
              borderRadius: '16px',
              fontWeight: '600',
              boxShadow: '0 12px 24px -10px rgba(143, 17, 22, 0.25)',
            }}
          />
        </SavedItemsProvider>
      </body>
    </html>
  );
}
