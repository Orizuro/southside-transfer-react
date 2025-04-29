"use client";
import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloatingButton = () => {
    const phoneNumber = "351914313808"; // 👈 Your real number here
    const whatsappLink = `https://wa.me/${phoneNumber}`;

    const [showBubble, setShowBubble] = useState(false);

    useEffect(() => {
        // Show bubble initially after 5 seconds
        const initialTimeout = setTimeout(() => {
            setShowBubble(true);

            // Hide after 5 seconds
            const hideTimeout = setTimeout(() => {
                setShowBubble(false);
            }, 5000);

            return () => clearTimeout(hideTimeout);
        }, 5000);

        // Set up interval to show bubble periodically
        const interval = setInterval(() => {
            setShowBubble(true);

            const hideTimeout = setTimeout(() => {
                setShowBubble(false);
            }, 5000); // Show bubble for 5 seconds

            return () => clearTimeout(hideTimeout);
        }, 30000); // Every 30 seconds, show bubble

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="fixed bottom-6 right-6 flex items-center z-50">
            {/* Help Bubble */}
            <div
                className={`mr-3 px-4 py-2 bg-white text-black text-sm rounded-lg shadow-md transition-all duration-300 transform ${
                    showBubble ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                }`}
            >
                Need Help?
            </div>

            {/* WhatsApp Button */}
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-whatsgreen text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                aria-label="Chat on WhatsApp"
            >
                <FaWhatsapp size={28} />
            </a>
        </div>
    );
};

export default WhatsAppFloatingButton;
