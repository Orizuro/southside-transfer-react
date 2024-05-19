"use client";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { DetailedHTMLProps, useEffect, useState } from "react";
import { tripInfo, costumerDetails } from "@/app/module";

enum StatusesOfEmail {
  Error,
  Success,
}

export default function Sucess() {
  // let emailStatus;
  let infoData: tripInfo;
  let infoCustumer: costumerDetails;

  const [emailStatus, setEmailStatus] = useState<StatusesOfEmail>(StatusesOfEmail.Success);

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


  async function sendEmail(infoData: tripInfo, infoCustumer: costumerDetails) {

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
      // emailStatus = <div className=""> Success </div>
      console.log(response);
    }).catch(function(error) {
      setEmailStatus(StatusesOfEmail.Error);
      console.log(error);
    });

  }

  // Send the emails
  // useEffect(() => {
  //   sendEmail(infoData, infoCustumer)//.then(r => {})
  // });

  return <div>
    <h1>{emailStatus}</h1>
    <div></div>
    <Button onClick={() => sendEmail(infoData, infoCustumer)}> Send email </Button>
  </div>
}
