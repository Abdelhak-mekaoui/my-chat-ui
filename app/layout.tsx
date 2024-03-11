// components/RootLayout.tsx
import React from 'react';
import Footer from '@/components/Footer';
import NextAuthProvider from '@/components/NextAuthProvider';
import { Session } from 'next-auth';
import Navbar from '@/components/Navbar';
import "./globals.css"
// Include session in the type definition for props
type RootLayoutProps = {
  children: React.ReactNode;
  session: Session | null; // Assuming you want to allow for a null session
};

const RootLayout: React.FC<RootLayoutProps> = ({ children, session }) => {

  return (
    <html lang="en">
      <body className="p-2 px-4">
          <NextAuthProvider session={session}> 
            <Navbar />
            {children}
            <Footer />
          </NextAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
