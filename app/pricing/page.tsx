"use client"
import React, { useEffect } from 'react';
import script from "@/app/pricing/script";
import {useRouter} from "next/navigation";
// Adjust the path as necessary

declare global {
    interface Window {
        MyPOSEmbedded: any;
    }
}

const PaymentPage: React.FC = () => {
    const scriptLoaded = script('https://developers.mypos.eu/repository/mypos-embedded-sdk.js');
    const router = useRouter();


    useEffect(() => {
        if (scriptLoaded && window.MyPOSEmbedded) {
            const paymentParams = {
                sid: '000000000000010',
                walletNumber: '61938166610',
                amount: 23.45,
                currency: 'EUR',
                PaymentMethod: 1 ,
                orderID: Math.random().toString(36),
                urlNotify: window.MyPOSEmbedded.IPC_URL + '/client/ipcNotify',
                urlOk: window.location.href,
                urlCancel: window.location.href,
                keyIndex: 1,
                cartItems: [
                    {
                        article: 'HP ProBook 6360b sticker',
                        quantity: 2,
                        price: 10,
                        currency: 'EUR',
                    },
                ]
            };

            const callbackParams = {
                isSandbox: true,
                onSuccess: function (data: any) {
                    console.log('success callback');
                    console.log(data);
                    document.getElementById('paymentDetails')!.innerHTML = `
            Order ID:<br/>${data['OrderID']}<br/><br/>
            Reference:<br/>${data['IPC_Trnref']}<br/><br/>
            Date:<br/>${data['RequestDateTime']}<br/><br/>
            STAN:<br/>${data['RequestSTAN']}
          `;
                    router.push("/thanks")
                },
                onError: function () {
                    console.log('error');
                    alert('An error occurred');
                }
            };

            window.MyPOSEmbedded.createPayment(
                'myPOSEmbeddedCheckout',
                paymentParams,
                callbackParams
            );
        }
    }, [scriptLoaded]);
    //
    return (
        <div>
            <style>{`
        body { background-color: #007bff; }
        h1, h3 { color: white; text-align: center; }
      `}</style>
            <h1>myPOS Example Website</h1>
            <h3 id="paymentDetails"></h3>
            <div id="myPOSEmbeddedCheckout"></div>
        </div>
    );
};

export default PaymentPage;
