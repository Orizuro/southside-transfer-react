"use client";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Script from "next/script";

export default function Sucess() {
    var component;


    async function checkout() {

        await axios.post(
            "/sucess/api/",
            {
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
    return <div>
        <Script> checkout</Script>
        <h1> Sucess</h1>
        <Button onClick={checkout}> Click </Button>
    </div>
}
