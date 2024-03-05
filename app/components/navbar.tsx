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
  return <Link href={href}>
    <p>{text}</p>
  </Link>
}


export default function NavBar() {
  {/* className="flex  p-6"  
  fixed flex w-full h-20 justify-between px-6 items-center text-xl
  flex gap-x-8 justify-between
  */ }
  return <div className="navbar border-b-2 border-black px-12 sticky bg-black text-whiteBg">
    {/* Where the icons goes*/}

    <div className="navbar-start">
      <Link href="/">
        <Image src={"logo.svg"}
          alt=""
          width={56}
          height={56}
        />
      </Link>
    </div>

    <div className="grow sm:"></div>
    <div className="hidden sm:flex navbar-center gap-x-8">

      <ItemLink href="/how-it-works" text="How it works" />

      <ItemLink href="/pricing" text="Pricing" />

      <ItemLink href="/about" text="About" />

    </div>

    <div className="navbar-end">
      <CtnButton />
    </div>

    <div className="sm:hidden">
      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
    </div>


  </div >
}
