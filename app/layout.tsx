import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globasl.css";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Script from "next/script";
import WhatsAppFloatingButton from "@/app/components/WhatsAppFloatingButton";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Southside Transfers | Premium Transportation in Algarve, Portugal",
  description: "Discover reliable transportation services in Algarve, Portugal. Our premium fleet offers seamless transfers from anywhere to explore the stunning Algarve region. Enjoy comfort, punctuality, and competitive rates with our professional drivers. Book now for an unforgettable journey through Algarve's beautiful landscapes and attractions.",
  keywords: "Algarve transfers, Portugal transportation, airport transfers, private transfers, family-friendly transfers, golf transfers, Faro airport",
  authors: [{ name: "Southside Transfers" }],
  creator: "Southside Transfers",
  publisher: "Southside Transfers",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.southsidetransfers.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Southside Transfers | Premium Transportation in Algarve, Portugal",
    description: "Reliable transportation services in Algarve, Portugal. Premium fleet with seamless transfers throughout the Algarve region.",
    url: "https://www.southsidetransfers.com",
    siteName: "Southside Transfers",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Southside Transfers | Premium Transportation in Algarve, Portugal",
    description: "Reliable transportation services in Algarve, Portugal. Premium fleet with seamless transfers throughout the Algarve region.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const secretKey = process.env.GOOGLE_SECRET_KEY;
  const scriptText: string = "https://maps.googleapis.com/maps/api/js?key=" + secretKey + "&loading=async&libraries=places"

  return (
    <html lang="en" className="bg-white scroll-smooth">
      <body className={`${inter.className} antialiased text-base text-black`}>
        <NavBar />
        <main className="min-h-screen">
          <Script async={true} src={scriptText} strategy="beforeInteractive" />
          {children}
          <WhatsAppFloatingButton />
        </main>
        <Footer />
      </body>
    </html>
  );
}
