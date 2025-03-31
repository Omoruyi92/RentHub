import React, { ReactNode } from 'react';
import "@/app/globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navigation />
          <main className="pt-[100px]">{children}</main> {/* Add padding-top */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}