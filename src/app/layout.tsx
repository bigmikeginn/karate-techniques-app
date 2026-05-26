import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://app.jitsudo.ca"),
  applicationName: "Jitsu-Do Techniques Library",
  title: "Jitsu-Do Techniques Library",
  description: "Explore and learn Karate and Brazilian Jiu-Jitsu techniques with the Jitsu-Do Academy.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "education",
  openGraph: {
    title: "Jitsu-Do Techniques Library",
    description: "Student resource for Karate and BJJ techniques",
    url: "https://app.jitsudo.ca",
    siteName: "Jitsu-Do Academy",
    images: [
      {
        url: "/jitsudo-og.jpg",
        width: 1200,
        height: 630,
        alt: "Jitsu-Do Techniques Library",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jitsu-Do Techniques Library",
    description: "Student resource for Karate and BJJ techniques",
    images: ["/jitsudo-og.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/karate-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
