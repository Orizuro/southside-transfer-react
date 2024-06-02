import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globasl.css";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Southside Transfers",
  description: "Discover reliable transportation services in Algarve, Portugal. Our premium fleet offers seamless transfers from anywhere to explore the stunning Algarve region. Enjoy comfort, punctuality, and competitive rates with our professional drivers. Book now for an unforgettable journey through Algarve’s beautiful landscapes and attractions. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const secretKey = process.env.GOOGLE_SECRET_KEY;
  const scriptText: string = "https://maps.googleapis.com/maps/api/js?key=" + secretKey + "&loading=async&libraries=places"


  return (
    <html lang="en" className="bg-whiteBg">
      <body className={inter.className}>
        <NavBar />
        {/*className="container mx-auto pt-4 min-h-screen"*/}
        <main >
          <Script async={true} src={scriptText} strategy="beforeInteractive" />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
