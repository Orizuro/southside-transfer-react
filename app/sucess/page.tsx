"use client";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useEffect } from "react";
import HTML_TEMPLATE from "./api/email";

export default function Sucess() {
  var component;
  var data: {};
  if (typeof window !== 'undefined') {
    data = localStorage.getItem("travelInfo") ? JSON.parse(localStorage.getItem("travelInfo")) : null;
  } else {
    data = {}
  }



  async function checkout(data: any) {

    await axios.post(
      "/sucess/api/",
      {
        data: data
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
    checkout(data)
  }, [])

  return <div>
    <h1>{component}</h1>
    <Button onClick={() => checkout(data)}> Click </Button>
  </div>
}
