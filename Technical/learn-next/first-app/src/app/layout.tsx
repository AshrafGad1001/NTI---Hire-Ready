import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import "./globals.css";
config.autoAddCss = false;

import Navbar from "./_Components/navbar/Navbar";
import Footer from "./_Components/footer/Footer";

export const metadata: Metadata = {
  title: "main-App",
  description: "main-App For Leaning Next.js",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <body className="d-flex flex-column min-vh-100">

        <Navbar />
        <main className="flex-grow-1">
          {children}
        </main>
        <Footer />


      </body>
    </html>
  );
}