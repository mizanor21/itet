"use client";

import React, { useState } from "react";

const EventsDetails = () => {

    const [quantity, setQuantity] = useState(1);

    const ticketPrice = 1000;
    const subTotal = ticketPrice * quantity;

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section */}
            <div className="lg:col-span-2 space-y-6">
                {/* Event Image */}
                <img
                    src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Event"
                    className="w-full h-72 object-cover rounded-lg"
                />

                {/* Event Information */}
                <div>
                    <h2 className="text-2xl font-bold text-orange-600 mb-3">
                        Event Information
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Influential media, entertainment & technology show inspirational
                        speakers including game-changing, not just a large-scale
                        conference, but a large educational hub on digital technology for
                        business, where people communicate, and are inspired to find
                        ready-made solutions or business. Taking place over two days this
                        year will be the 10th Conference Ideas with a theme of
                        DangeroRealities. It features sessions
                    </p>
                </div>

                {/* Event About */}
                <div>
                    <h2 className="text-2xl font-bold text-orange-600 mb-3">Event About</h2>
                    <p className="text-gray-700 mb-4">
                        Are you a founder that is building a new better future for women? Are
                        you working with another co-founder or considering finding one? Learn
                        how to build a co-founder relationship more effectively at the virtual
                        event!
                    </p>

                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Creating a co-founder agreement.</li>
                        <li>Importance of defined roles.</li>
                        <li>Creating a co-founder agreement.</li>
                        <li>Importance of defined roles.</li>
                    </ul>

                    <p className="text-gray-700 mt-4">
                        Are you a founder that is building a new better future for women? Are
                        you working with another co-founder or considering finding one? Learn
                        how to build a co-founder relationship more effectively at virtual
                        events!
                    </p>
                </div>
            </div>

            {/* Right Section */}
            <div className="space-y-6">
                {/* Event Meta Info */}
                <div className="bg-[#fdfaf7] rounded-lg shadow-sm p-6 space-y-3 text-gray-700 text-sm">
                    <p>
                        <span className="font-semibold">Date :</span> 10 May 2025
                    </p>
                    <p>
                        <span className="font-semibold">Time :</span> 10:00 am - 10:00 pm
                        (Asia/Dhaka)
                    </p>
                    <p>
                        <span className="font-semibold">Venue :</span> ITET Office
                    </p>
                </div>

                {/* Ticket Details */}
                <div className="bg-[#fdfaf7] rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 border-dotted border-orange-400">
                        Ticket Details
                    </h3>

                    <div className="flex justify-between items-center text-sm mb-4">
                        <span className="font-semibold">Ticket Price</span>
                        <span>৳ {ticketPrice.toFixed(2)}</span>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex justify-between items-center text-sm mb-4">
                        <span className="font-semibold">Quantity</span>
                        <div className="flex items-center border rounded-md">
                            <button
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                            >
                                -
                            </button>
                            <span className="px-4">{quantity}</span>
                            <button
                                onClick={() => setQuantity((q) => q + 1)}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Subtotal */}
                    <div className="flex justify-between items-center text-sm mb-6">
                        <span className="font-semibold">Sub-Total</span>
                        <span>৳ {subTotal.toFixed(2)}</span>
                    </div>

                    {/* Process Payment */}
                    <button className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white py-3 rounded-md font-semibold">
                        Process Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventsDetails;
