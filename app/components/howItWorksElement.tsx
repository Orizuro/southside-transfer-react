import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  title: string;
  alt: string;
  text: string;
  num: string;
  image: string;
  button?: ReactNode;
}

export default function HowItWorks({ title, text, image, num, button, alt }: Props) {
  return (
    <div className="relative">
      {/* Number badge */}
      <div className="absolute top-4 left-4 bg-accent w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-md">
        <span className="text-center font-bold text-xl text-white">{num}</span>
      </div>

      {/* Card content */}
      <div className="bg-white p-6 rounded-2xl shadow-lg h-full border border-gray-100 transition-shadow hover:shadow-xl">
        {/* Icon */}
        <div className="flex justify-center my-6">
          <Image 
            src={image} 
            width={100} 
            height={100} 
            alt={alt}
            className="h-20 w-20 object-contain" 
          />
        </div>

        {/* Title */}
        <h3 className="text-center text-xl font-semibold mb-4 text-black">{title}</h3>

        {/* Description */}
        <p className="text-base text-gray-600 leading-relaxed mb-4">{text}</p>

        {/* Optional button */}
        {button && <div className="mt-4">{button}</div>}
      </div>
    </div>
  );
}
