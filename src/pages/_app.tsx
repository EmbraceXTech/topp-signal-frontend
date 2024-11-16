import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "@/contexts/auth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${geistSans.variable} ${geistMono.variable} light bg-[#F5F5F5] text-gray-700`}
    >
      <NextUIProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </NextUIProvider>
    </main>
  );
}
