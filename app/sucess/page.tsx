"use client";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Script from "next/script";
import { useEffect } from "react";

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
    ).then(function(response) {
      component = <div className=""> Success </div>
      console.log(response);
    }).catch(function(error) {
      component = <div className=""> Error </div>
      console.log(error);
    });

  }

  // const [data, setData] = useState(null)
  // const [isLoading, setLoading] = useState(true)

  // useEffect(() => {
  //   fetch('/api/profile-data')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data)
  //       setLoading(false)
  //     })
  // }, [])

  useEffect(() => { checkout() })

  return <div>
    {/*<Script>checkout</Script>*/}
    <h1>{component}</h1>
    <Button onClick={checkout}> Click </Button>
  </div>
}
