import {
  Link,
  Button
} from "@nextui-org/react";

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
  return <div className="navbar border-b-2 border-black px-12 sticky bg-white">
    {/* Where the icons goes*/}

    <div className="navbar-start">
      <Link href="/">
        LOGO
      </Link>
    </div>

    <div className="navbar-center gap-x-8">

      <ItemLink href="/how-it-works" text="How it works" />

      <ItemLink href="/pricing" text="Pricing" />

      <ItemLink href="/about" text="About" />

    </div>

    <div className="navbar-end">
      <button className="w-fit btn btn-primary">
        Book your ride
      </button>
    </div>

  </div >
}
