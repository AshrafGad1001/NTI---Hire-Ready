import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";

import ThemeRegistry from './_Components/ThemeRegistry'



import "./globals.css";
import Navbar from "./_Components/navbar/Navbar";
import Footer from "./_Components/footer/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: 'My App',
  description: 'My App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <body >


        <ThemeRegistry>
          <Navbar />
          <main className="flex-grow-1">
            {children}
          </main>
          <Footer />
        </ThemeRegistry>




      </body>
    </html>
  );
}
