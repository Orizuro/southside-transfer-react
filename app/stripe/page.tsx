"use client";

import '.././styles.css'
import data from '../../public/cities.json' assert { type: 'json' };
import { Dispatch, SetStateAction, useState } from 'react';
import React from 'react';
import FormElement from '../components/forms';
import { Button } from '@nextui-org/react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation'


export default function Stripe() {
    const searchParams = useSearchParams()
    async function checkout() {

        const { data } = await axios.post(
            "/stripe/api",
            {
                priceId: 100
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        // const data = await fetch('/stripe/api', {

        //     method: "POST",
        //     headers: {
        //     },
        //     body: JSON.stringify({ item: "some" })
        // }
        // ).then((data) => data.json());
        console.log(data);
        window.location.assign(data);
    }
    return (
        <>
            <div className=' m-3'>
                <h1 className=' font-semibold text-2xl'> Final steps</h1>
                <br />
                <p className=' border-b border-gray-900/10 pb-4'> We just need some more information to finish the reservation.</p>
                <Button onClick={checkout}> Click</Button>
            </div>

        </>
    )
}