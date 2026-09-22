import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./tokens.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SetPageTitle } from "@/components/SetPageTitle";
import { AuthProvider } from "@/lib/AuthContext";
import { ThemeProvider } from "@/lib/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkillBridge — Know Your Career Readiness",
  description:
    "See how your skills match real employer demand, and exactly what to learn next.",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('skillbridge_theme');document.documentElement.dataset.theme=(t==='light'?'light':'dark');}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col justify-between`}>
        <ThemeProvider>
          <AuthProvider>
            <SetPageTitle />
            <div>
              <Navbar />
              {children}
            </div>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}