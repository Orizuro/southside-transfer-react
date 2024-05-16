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
    <div className="sm:px-10 px-3 py-5 flex items-center justify-between  ">
      {/* Where the icons goes*/}

      <div className="flex items-center ">
        <Link href="/">
          <Image src={"logo.svg"}
            alt=""
            width={56}
            height={56}
          />
        </Link>
      </div>


      <div className="hidden sm:flex  gap-x-2">

        <ItemLink href="/how-it-works" text="How it works" />

        <ItemLink href="/checkout" text="Pricing" />

        <ItemLink href="/about" text="About" />

      </div>

      {
        // <div className="">
        //   <CtnButton />
        // </div>
      }

      <div className="sm:hidden ml-2">
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </div>

    </div>
  </nav >
}
