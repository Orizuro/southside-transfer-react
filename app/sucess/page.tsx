"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { tripInfo, costumerDetails } from "@/app/module";
import { ThreeCircles } from 'react-loader-spinner';
import { useRouter } from 'next/navigation'

enum StatusesOfEmail {
  Error,
  Success,
}

export default function Sucess() {
  // let emailStatus;
  const router = useRouter();
  let infoData: tripInfo;
  let infoCustumer: costumerDetails;

  const [, setEmailStatus] = useState<StatusesOfEmail>(StatusesOfEmail.Success);

  if (typeof window !== 'undefined') {
    const item = localStorage.getItem("tripInfo")
    const item2 = localStorage.getItem("costumerDetails")
    infoData = item ? JSON.parse(item) : ""
    infoCustumer = item2 ? JSON.parse(item2) : ""

  } else {
    infoData = { destination: "", nPassenger: 0, origin: "", price: 0, timeOfPickup: "", dateOfPickup: "", child: 0, additionInfo: "", adult: 0, infant: 0, olddata: "", totalLuggage: 0, travelTime: "", displayedName: "", flightNumber: "" }

    infoCustumer = {
      firstName: "",
      lastName: "",
      Payment: "",
      emailAddress: "",
      PhoneNumber: "",
    }
  }


  async function SendEmail(infoData: tripInfo, infoCustumer: costumerDetails) {

    await axios.post(
      "/sucess/api/",
      {
        infoData: infoData,
        infoCustumer: infoCustumer
      }, {
      headers: {
        "Content-Type": "application/json",
      },
    }
    ).then(function(response) {
      console.log(response);

      router.push("/thanks");
    }).catch(function(error) {
      setEmailStatus(StatusesOfEmail.Error);
      console.log(error);
    });

  }
  useEffect(() => {
    // This function will run once when the component mounts
    const runOnPageLoad = () => {
      SendEmail(infoData, infoCustumer)
    };
    runOnPageLoad();
  }, [SendEmail, infoCustumer, infoData]); // Empty dependency array ensures it runs only once on mount


  // Send the emails
  // useEffect(() => {
  //   sendEmail(infoData, infoCustumer)//.then(r => {})
  // });

  return <div>
    <div className={" items-center justify-center  grid-rows-3 grid m-20"}>
      <ThreeCircles
          visible={true}
          height={150}
          width={150}
          innerCircleColor={"#c8f18b"}
          middleCircleColor={"#3e8ba3"}
          outerCircleColor={"#97c9d8"}
          ariaLabel="rings-loading"
          wrapperStyle={{}}
          wrapperClass="items-center justify-center flex"/>
      <div className={"flex text-2xl justify-center font-semibold"}> Finishing</div>
      <div className={"flex justify-center font-light  text-lg"}> Sending a email your way</div>
    </div>


  </div>
}
