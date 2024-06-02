import NavBar from "../components/navbar";
import React from "react";

export default function About() {
  return (
    <>
        <div className="p-5">
            <h1 className={"text-4xl mb-5  "}>About Us</h1>
            <div className={"my-5"}>
                <h2 className={"text-xl font-semibold mb-2"}> Welcome to Southside Transfers!</h2>
                <p className={" text-justify"}> At Southside Transfers, we are dedicated to providing exceptional transfer and transportation services tailored to meet the unique needs of our clients. Whether you are traveling for business, leisure, or special events, our team is here to ensure your journey is comfortable, reliable, and stress-free.</p>
            </div>
            <div className="my-5">
                <h2 className={"text-xl font-semibold mb-2"}> Who We Are </h2>
                <p className={"text-justify"}>Southside Transfers was founded with a passion for delivering premium transportation solutions. Our experienced team is committed to excellence, ensuring every ride with us is a memorable experience. We take pride in our fleet of modern, well-maintained vehicles and our professional, courteous drivers who prioritize your safety and satisfaction.  </p>
            </div>
            <div className="my-5">
                <h2 className={"text-xl font-semibold mb-2"}> Contact Us </h2>
                <p className={"text-justify"}>Ready to book your next ride? Have questions or special requests? We’re
                    here to help!</p>
                <div className=" gap-10 ">
                    <div className=" text-lg py-5">
                        <a className="p-3 bg-[#DEDEDE] rounded-lg shadow-sm"
                           href={"mailto:bookings@southsidetransfers.com"}>bookings@southsidetransfers.com</a>
                    </div>
                    <div className=" flex text-lg">
                        <a className=" p-3 bg-[#DEDEDE] rounded-lg shadow-sm" href="tel://+351914313808">+351 914 313
                            808 </a>
                    </div>

                </div>
            </div>
        </div>
    </>
  );
}
