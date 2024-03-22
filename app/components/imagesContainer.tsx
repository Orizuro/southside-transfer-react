import Image from "next/image";
import CtnButton from "./myButton";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import MapComponent from "../pay/page";

export default function ImagesContainer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      console.log(isInView);
      mainControls.start("visible");
    }
  }, [isInView]);
  return (
    <div className="flex items-center justify-center">
      <div className="w-full h-[80vh] bg-image-container1 bg-cover bg-center bg-fixed">
        <div className="w-full h-full flex justify-center items-center backdrop-brightness-50">
          <div className="w-screen flex flex-col ">
            <div className="flex flex-row gap-24 justify-center items-center mx-60">
              <div ref={ref} className="container w-[80%]">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  initial="hidden"
                  animate={mainControls}
                  transition={{ duration: 0.1 }}
                >
                  <MapComponent />
                </motion.div>
              </div>

              <div className="text-whiteBg ">
                <h1 className="font-bold text-6xl">We help you get anywhere YOU want in Algarve.</h1>
                <p className="py-7 text-lg">
                  Effortlessly plan your journeys and we will create a seamless and cost-effective transfer experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
