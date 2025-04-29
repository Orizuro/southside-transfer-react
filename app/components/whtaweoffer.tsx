"use client";
import React from "react";
import Image from "next/image";

const services = [
    {
        title: "Family-Friendly Services",
        description: "Travel safely with free child seats, spacious vehicles for luggage and strollers, and comfortable rides for families of all sizes.",
        image: "/images/family-service.jpg",
    },
    {
        title: "Airport Transfers",
        description: "Enjoy reliable, on-time transfers to and from Faro Airport with meet and greet service — relax while we handle the logistics.",
        image: "/images/airport-transfer.jpg",
    },
    {
        title: "Private Transfers",
        description: "Custom rides across the Algarve for individuals or groups. Benefit from free cancellation, upfront pricing, and comfortable vehicles.",
        image: "/images/private-transfer.jpg",
    },
    {
        title: "Golf Transfers",
        description: "Ride in comfort to Algarve’s top golf courses, with flexible scheduling and space for all your equipment.",
        image: "/images/golf-transfer.jpg",
    },
];

const WhatWeOffer = () => {
    return (
        <section>
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8 text-black">What We Offer</h2>

                <div className="relative mt-12">
                    {/* Services Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-200
                                ${index % 2 !== 0 ? 'md:translate-y-8' : ''}`} // Alternating shift
                            >
                                {/* Image */}
                                <div className="h-56 w-full overflow-hidden">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        width={400}
                                        height={400}
                                        className="object-cover w-full h-full object-[0%_25%] transition-transform duration-500 hover:scale-105"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1 bg-white">
                                    <h3 className="text-lg font-semibold mb-3 text-black">{service.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed flex-1">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatWeOffer;
