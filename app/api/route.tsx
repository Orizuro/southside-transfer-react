import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";


export async function POST(request : NextRequest, res : NextResponse) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    let data = await request.json();
    // let priceId = data.priceId
    //let data = JSON.parse(dat);
    //data = JSON.parse(data);
    console.log(data);
    console.log(data.adult.toString());
    data.price = data.price.toFixed(2) * 100;
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "EUR",
                    unit_amount_decimal: data.price,
                    product_data: {
                        name: "Trip",
                        description:
                           `From:${data.origin} - To:${data.destination} at ${data.timeOfPickup}`,
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
