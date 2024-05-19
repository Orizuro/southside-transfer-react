import { ReactNode } from "react";

interface Props {
    title: string;
    text: string;
    image: string;
    button?: ReactNode;

}
export default function WhatWeOffer({ title, text, image, button }: Props) {
    return <div className="basis-1/3 " >
        <div className="p-4 container h-full flex">
            <div className=" shadow-2xl shadow-black/80 bg-whiteBg p-4 rounded-xl ">
                <p className=" text-center text-2xl font-extrabold"> {title} </p>
                <div className=" p-4 rounded-xl text-center">
                    <p className="  lg:text-lg font-medium text-justify "> {text} </p>
                </div>
            </div>
        </div>
    </div >

}