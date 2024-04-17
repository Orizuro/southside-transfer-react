"use client";
import {Button} from "@nextui-org/react";
import axios from "axios";
import {useEffect} from "react";
import {tripInfo, costumerDetails} from "@/app/module";

export default function Sucess() {
    var component;
    let infoData: tripInfo;
    let infoCustumer: costumerDetails;

    if (typeof window !== 'undefined') {
        const item = localStorage.getItem("tripInfo")
        const item2 = localStorage.getItem("costumerDetails")
        infoData = item ? JSON.parse(item) : ""
        infoCustumer = item2 ? JSON.parse(item2) : ""

    } else {
        infoData = {destination: "", nPassenger: 0, origin: "", time: "", price: 0}
        infoCustumer = {
            firstName: "",
            lastName: "",
            dateOfPickup: "",
            Payment: "",
            timeOfPickup: "",
            emailAddress: "",
            PhoneNumber: "",
            TotalLuggage: 0
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
        checkout(infoData, infoCustumer)
    }, [])

    return <div>
        <h1>{component}</h1>
        <Button onClick={() => checkout(infoData, infoCustumer)}> Click </Button>
    </div>
}
