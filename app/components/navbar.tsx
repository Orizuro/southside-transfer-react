import { Bars3Icon } from "@heroicons/react/16/solid";
import {
  Link,
} from "@nextui-org/react";

import CtnButton from "./myButton";
import Image from "next/image";

interface Props {
  href: string;
  text: string;
}

function ItemLink({ href, text }: Props) {
  return (
    <Link 
      href={href} 
      className="hover:bg-gray-800 transition-colors duration-200 flex px-4 py-2 rounded-md"
    >
      <p>{text}</p>
    </Link>
  );
}

export default function NavBar() {
  return (
    <nav className="bg-black text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
        {/* Logo */}
        <div className="flex items-center lg:order-1">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <Image src="logo.svg" alt="Logo" width={40} height={40} className="h-10 w-auto"/>
              <div className="font-semibold text-lg">Southside Transfers</div>
            </div>
          </Link>
        </div>

        {/* Menu items */}
        <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:order-2 mt-4 lg:mt-0">
          <div className="flex text-sm md:text-base">
            <ItemLink href="/#HowItWorks" text="How it works"/>
            <ItemLink href="/about" text="About Us"/>
            <ItemLink href="/#WhatWeOffer" text="What we offer"/>
          </div>
        </div>
      </div>
    </nav>
  );
}
