import { NextResponse, type NextRequest } from "next/server"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"
import HTML_TEMPLATE from "./email_client";
import {costumerDetails, tripInfo} from "@/app/module";

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

    var mailOptions: Mail.Options = {
      from: process.env.NODEMAILER_EMAIL,
      to: "sansasha707@gmail.com",
      subject: `Message from ()`,
      text: `Message from (${client.emailAddress})`,
      html: HTML_TEMPLATE(client.firstName, client.lastName, trip.origin, trip.destination, client.dateOfPickup, client.timeOfPickup)
    }
    await transport.sendMail(mailOptions)
    return NextResponse.json({ message: "Success!", status: 200 })
  } catch (err) {
    return NextResponse.json({ message: "Failed!", status: 500 })
  }
}
