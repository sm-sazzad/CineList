import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import MoviesProvider from "./Context/MoviesContext";
import { ToastContainer } from "./Components/Toast/Toast";
import Footer from "./Components/Footer";
import ScrollProgressBar from "./Components/ScrollProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CineList - Explore Movies & Track Watchlist",
  description: "Explore movies, create your personal watchlist and discover cinema with CineList.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black overflow-x-hidden">
        <ScrollProgressBar />
        <MoviesProvider>
          <ToastContainer />
          <Navbar />

          <div className="bg-black">
            {children}
          </div>
          <Footer />

        </MoviesProvider>
      </body>
    </html>
  );
}
