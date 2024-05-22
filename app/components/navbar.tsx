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
    <div className="sm:px-10 px-3 py-5 grid grid-cols-3 items-center ">
      {/* Where the icons goes*/}

      <div className=" items-center justify-start flex   col-span-2 lg:col-end-2">
        <Link href="/">
          <div className="flex items-center justify-center w-full lg:w-auto">
          <Image src={"logo.svg"} className={""}
                 alt=""
                 width={40}
                 height={40}
          />
          <div> Southside Transfers</div>
          </div>
        </Link>

      </div>


      <div className="hidden sm:flex text-xl items-center justify-center justify-items-center gap-x-2">

        <button><a href="/#HowItWorks" className={"scroll-smooth"}>How it works</a></button>

        <ItemLink href="/about" text="About"/>

        <button><a href="/#WhatWeOffer" className={"scroll-smooth"}>What we offer</a></button>



      </div>


      {/*
        To put the letters in the middle
        Else it would be in the right
      */}

      {
        // <div className="">
        //   <CtnButton />
        // </div>
      }

      <div className="sm:hidden ml-2 justify-end flex col-start-3 ">
        <Bars3Icon className=" h-10" aria-hidden="true" />
      </div>

    </div>
  </nav >
}
