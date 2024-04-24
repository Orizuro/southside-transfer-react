"use client";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useEffect } from "react";
import { tripInfo, costumerDetails } from "@/app/module";

export default function Sucess() {
    let component;
    let infoData: tripInfo;
    let infoCustumer: costumerDetails;

    if (typeof window !== 'undefined') {
        const item = localStorage.getItem("tripInfo")
        const item2 = localStorage.getItem("costumerDetails")
        infoData = item ? JSON.parse(item) : ""
        infoCustumer = item2 ? JSON.parse(item2) : ""

    } else {
        infoData = { destination: "", nPassenger: 0, origin: "", price: 0, timeOfPickup: "", dateOfPickup: "", child: 0, additionInfo: "", adult: 0, infant: 0, olddata: "", totalLuggage: 0,travelTime: "", displayedName: "", flightNumber:"" }

        infoCustumer = {
            firstName: "",
            lastName: "",
            Payment: "",
            emailAddress: "",
            PhoneNumber: "",
        }
    }

    async function checkout(infoData: tripInfo, infoCustumer: costumerDetails) {

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
        ).then(function (response) {
            component = <div className=""> Success </div>
            console.log(response);
        }).catch(function (error) {
            component = <div className=""> Error </div>
            console.log(error);
        });

    }

    useEffect(() => {
        checkout(infoData, infoCustumer)//.then(r => {})
    }, [checkout, infoCustumer, infoData])

    return <div>
        <h1>{component}</h1>
        <Button onClick={() => checkout(infoData, infoCustumer)}> Click </Button>
    </div>
}
