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
  return <Link href={href} className="hover:bg-neutral-800 flex px-4 py-2">
    <p>{text}</p>
  </Link>
}


export default function NavBar() {
  {/* className="flex  p-6"  
  fixed flex w-full h-20 justify-between px-6 items-center text-xl
  flex gap-x-8 justify-between
  */ }
  return <nav className="  bg-black text-whiteBg">
    <div className="lg:px-10 px-3 py-5 flex flex-col lg:flex-row  lg:justify-between ">
      {/* Wrapper div for the logo */}
      <div className=" flex items-center lg:order-1 ">
        <Link href="/">
          <div className=" flex items-center">
            <Image src="logo.svg" alt="Logo" width={40} height={40}/>
            <div>Southside Transfers</div>
          </div>
        </Link>
      </div>

      {/* Wrapper div for the menu items */}
      <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:order-2 mt-4 lg:mt-0  ">
        <div className="flex text-sm md:text-base lg:text-xl">
          <ItemLink href="/#HowItWorks" text="How it works"/>
          <ItemLink href="/about" text="About Us"/>
          <ItemLink href="/#WhatWeOffer" text="What we offer"/>
        </div>
      </div>
    </div>


  </nav>
}
