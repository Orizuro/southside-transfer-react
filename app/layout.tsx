import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globasl.css";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "South Side Transfers",
  description: " [Description] ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const secretKey = process.env.GOOGLE_SECRET_KEY;
  const scriptText: string = "https://maps.googleapis.com/maps/api/js?key=" + secretKey + "&libraries=places"


  return (
    <html lang="en" className="bg-whiteBg">
      <body className={inter.className}>
        <NavBar />
        {/*className="container mx-auto pt-4 min-h-screen"*/}
        <main >
          <Script src={scriptText} strategy="beforeInteractive" />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
