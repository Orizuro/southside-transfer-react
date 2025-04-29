"use client";
import {PayPalScriptProvider, PayPalButtons, ReactPayPalScriptOptions} from "@paypal/react-paypal-js";

export default function Paypal() {
    const initialOptions: ReactPayPalScriptOptions = {
        clientId: "YOUR_CLIENT_ID",
        // Add other options as needed
    };

    return (
        <div className="App">
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons />
            </PayPalScriptProvider>
        </div>
    );
}