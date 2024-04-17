import { NextResponse, type NextRequest } from "next/server"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"
import HTML_TEMPLATE from "./email";

export async function POST(request: NextRequest) {

  const { data } = await request.json()

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  })



  try {
    /*
  additionalInformation
  email
  firstName
  lastName
  numSuitcases
  payment
  phoneNumber
  pickupDate
  pickupTime
  terms
  */
    var mailOptions: Mail.Options = {
      from: process.env.NODEMAILER_EMAIL,
      to: "sansasha707@gmail.com",
      subject: `Message from ()`,
      text: `Message from (${data.email})`,
      html: HTML_TEMPLATE(data.firstName, data.lastName, "here", "there", data.pickupDate, data.pickupTime)
    }
    await transport.sendMail(mailOptions)
    return NextResponse.json({ message: "Success!", status: 200 })
  } catch (err) {
    return NextResponse.json({ message: "Failed!", status: 500 })
  }
}
