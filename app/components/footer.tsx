"use client";

import React from "react";

export default function Footer() {
    return (
        <footer className="bg-black text-white py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center">
                    {/* Links */}
                    <nav className="flex space-x-8 mb-6">
                        <a 
                            className="hover:text-gray-300 transition-colors duration-200" 
                            href="/about"
                        >
                            About Us
                        </a>
                        <a 
                            className="hover:text-gray-300 transition-colors duration-200" 
                            href="/#ContactUs"
                        >
                            Contact Us
                        </a>
                    </nav>

                    {/* Contact Info */}
                    <div className="text-center mb-6">
                        <h3 className="text-lg font-medium mb-4">Send an email or call us:</h3>
                        <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 items-center justify-center">
                            <a 
                                className="hover:text-primary-light transition-colors duration-200"
                                href="mailto:bookings@southsidetransfers.com"
                            >
                                bookings@southsidetransfers.com
                            </a>
                            <a 
                                className="hover:text-primary-light transition-colors duration-200" 
                                href="tel://+351914313808"
                            >
                                +351 914 313 808
                            </a>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-sm text-gray-400">
                        <p>© 2024 Southside Transfer. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
