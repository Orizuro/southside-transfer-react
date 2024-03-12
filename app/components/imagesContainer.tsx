import Image from "next/image";
import CtnButton from "./myButton";

export default function ImagesContainer() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full h-[60vh] bg-image-container1 bg-cover bg-center bg-fixed">
        <div className="w-full h-full flex justify-center items-center backdrop-brightness-50">
          <div className="w-screen flex flex-col ">
            <div className="text-whiteBg flex flex-col justify-center items-center">
              <h1 className="font-bold text-6xl">We help you get anywhere YOU want in Algarve.</h1>
              <p className="py-7">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu. <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.
              </p>
            </div>

            <div className="flex justify-center items-center gap-8">
              <CtnButton />
              <button>Know more</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
