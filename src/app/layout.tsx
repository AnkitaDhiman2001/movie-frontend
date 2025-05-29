import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; 
import Header from '@/components/Header'; 
import Footer from '@/components/Footer'; 
import { AuthProvider } from '@/context/AuthContext';
import AuthGuard from '@/components/AuthGuard';    
import Providers from '@/redux/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Civvy ',
  description: 'Discover amazing movies and TV shows',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 dark:bg-gray-900 flex flex-col min-h-screen`}>
        <Providers>
        <AuthProvider> 
          <AuthGuard>   
        <Header />
        <main className="flex-grow container mx-auto px-0 sm:px-4 py-8">
          {children}
        </main>
        <Footer />
          </AuthGuard>
        </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
