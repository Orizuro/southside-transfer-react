import { Bars3Icon } from "@heroicons/react/16/solid";
import {
  Link, button,
} from "@nextui-org/react";

import CtnButton from "./myButton";
import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  title: string;
  text: string;
  num: string;
  image: string;
  button?: ReactNode;

}
export default function HowItWorks({ title, text, image, num, button }: Props) {
  return <div className=" " >
    <div className=" absolute bg-[#E8871E] btn-circle flex ">
      <p className=" text-center m-auto font-bold text-xl"> {num}</p>
    </div>
    <div className="p-5 container h-full flex">
      <div className=" shadow-2xl shadow-black/80 bg-whiteBg p-5 rounded-xl ">
        <div className="image-container flex justify-center  my-10">
          <img src={image} width={130} height={130} />
        </div >
        <p className=" text-center text-2xl font-extrabold"> {title} </p>
        <div className=" p-2 rounded-xl text-justify">
          <p className="  text-lg font-medium " > {text} </p>
          {button}
        </div>
      </div>
    </div>
  </div>

}
