// components/RootLayout.tsx
import React from 'react';
import Footer from '@/components/Footer';
import NextAuthProvider from '@/components/NextAuthProvider';
import { Session } from 'next-auth';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
import "./globals.css"
import Sidebar from '@/components/Sidebar';
import RecoilProvider from '@/components/RecoilProvider';
// Include session in the type definition for props
type RootLayoutProps = {
  children: React.ReactNode;
  session: Session | null; 
};

const RootLayout: React.FC<RootLayoutProps> = ({ children, session }) => {

  return (
    <html lang="en">
      <body className="p-2 px-4 ">
        <RecoilProvider>
          <NextAuthProvider session={session}> 
          <Toaster />
            <Navbar />
            <div className='flex flex-row gap-2'>
              <Sidebar />
              {children}
            </div>
            <Footer />
          </NextAuthProvider>
        </RecoilProvider>
      </body>
    </html>
  );
};

export default RootLayout;
