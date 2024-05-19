import { NextResponse, type NextRequest } from "next/server"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"
import HTML_TEMPLATE from "./email_client";
import HTML_PRIV from "./email_priv";
import { costumerDetails, tripInfo } from "@/app/module";

export async function POST(request: NextRequest) {

  const { infoData, infoCustumer } = await request.json()


  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  })



  try {
    const trip: tripInfo = infoData;
    const client: costumerDetails = infoCustumer;

    const mailOptionsClient: Mail.Options = {
      from: process.env.NODEMAILER_EMAIL,
      to: client.emailAddress,
      subject: `Your trip with SouthSide Transfers`,
      text: `Message from (${client.emailAddress})`,
      html: HTML_TEMPLATE(client.firstName, client.lastName, trip.origin, trip.destination,trip.dateOfPickup, trip.timeOfPickup, client.Payment, trip.price, trip.nPassenger)
    };
    const mailOptionsOwner: Mail.Options = {
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.NODEMAILER_EMAIL,
      subject: `Trip reservation ${client.firstName} ${trip.dateOfPickup}`,
      text: `Message from (${client.emailAddress})`,
      html: HTML_PRIV(
          client.firstName,
          client.lastName,
          client.Payment,
          client.PhoneNumber,
          client.emailAddress,
          trip.origin,
          trip.destination,
          trip.price,
          trip.dateOfPickup,
          trip.timeOfPickup,
          trip.nPassenger,
          trip.adult,
          trip.child,
          trip.infant,
          trip.flightNumber,
          trip.displayedName,
          trip.totalLuggage
          )
    };
    await transport.sendMail(mailOptionsClient)
    await transport.sendMail(mailOptionsOwner)
    return NextResponse.json({ message: "Success!", status: 200 })
  } catch (err) {
    return NextResponse.json({ message: "Failed!", status: 500 })
  }
}
