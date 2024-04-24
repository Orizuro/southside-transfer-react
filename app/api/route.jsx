import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let data = await request.json();
    let priceId = data.priceId
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "EUR",
                    unit_amount: priceId * 100,
                    product_data: {
                        name: "Trip",

                    },
                },
                quantity: 1
            }
        ],
        success_url: 'http://localhost:3000/sucess',
        //cancel_url: 'http://localhost:3000',
        mode: 'payment',
    });
    console.log(session.url);
    return NextResponse.json(session.url);
}