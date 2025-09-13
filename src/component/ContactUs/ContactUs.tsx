'use client'

import React, { useState } from 'react';
import { MapPin, Headphones, Package, HelpCircle, Mail, Phone, Send, User, MessageSquare } from 'lucide-react';

// Define types
type IconMap = {
    [key: string]: React.ComponentType<{ className?: string; size?: number }>;
};

interface ContactDetail {
    text: string;
    link: string;
    type: 'email' | 'phone' | 'address';
}

interface ContactItem {
    type: string;
    icon: string;
    title: string;
    details: ContactDetail[];
}

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface ContactCardProps {
    item: ContactItem;
    index: number;
    isActive: boolean;
    onClick: () => void;
}

const ContactUs = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [activeCard, setActiveCard] = useState<number | null>(null);

    // Icon mapping for the contact data
    const iconMap: IconMap = {
        SlLocationPin: MapPin,
        CiHeadphones: Headphones,
        DiDropbox: Package,
        PiQuestionMarkLight: HelpCircle,
        email: Mail,
        phone: Phone,
        address: MapPin
    };

    const contactData: ContactItem[] = [
        {
            type: "address",
            icon: "SlLocationPin",
            title: "ADDRESS",
            details: [
                {
                    text: "H-6, R-2, S-11, Uttara, Dhaka.",
                    link: "https://www.google.com/maps?q=H-6,+R-2,+S-11,+Uttara,+Dhaka",
                    type: 'address'
                }
            ],
        },
        {
            type: "support",
            icon: "CiHeadphones",
            title: "General Support",
            details: [
                {
                    text: "info@itetbd.net",
                    link: "mailto:info@itetbd.net",
                    type: 'email'
                },
                {
                    text: "+880 1715-771454",
                    link: "tel:+8801715771454",
                    type: 'phone'
                }
            ],
        },
        {
            type: "ads",
            icon: "DiDropbox",
            title: "Advertisement Support",
            details: [
                {
                    text: "p&p@itetbd.net",
                    link: "mailto:p&p@itetbd.net",
                    type: 'email'
                },
                {
                    text: "+8801715771454",
                    link: "tel:+8801715771454",
                    type: 'phone'
                }
            ],
        },
        {
            type: "general",
            icon: "PiQuestionMarkLight",
            title: "General Correspondence",
            details: [
                {
                    text: "secr.general@itetbd.net",
                    link: "mailto:secr.general@itetbd.net",
                    type: 'email'
                },
                {
                    text: "+8801715771454",
                    link: "tel:+8801715771454",
                    type: 'phone'
                }
            ],
        }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Message sent successfully!');
        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    const getDetailIcon = (type: 'email' | 'phone' | 'address') => {
        return iconMap[type] || Mail;
    };

    const ContactCard: React.FC<ContactCardProps> = ({ item, index, isActive, onClick }) => {
        const IconComponent = iconMap[item.icon];
        return (
            <div
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100 ${isActive ? 'ring-2 ring-yellow-500' : ''}`}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                onClick={onClick}
            >
                <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-3 rounded-xl text-white mr-4">
                        {IconComponent && <IconComponent size={24} />}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                </div>

                <div className="space-y-3">
                    {item.details.map((detail, idx) => {
                        const DetailIcon = getDetailIcon(detail.type);
                        return (
                            <a
                                key={idx}
                                href={detail.link}
                                className="flex items-center text-gray-600 hover:text-yellow-600 transition-colors duration-200 group"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <DetailIcon size={16} className="mr-3 text-gray-400 group-hover:text-yellow-500" />
                                <span className="text-sm group-hover:underline">{detail.text}</span>
                            </a>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-50 text-gray-800">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-sky-600 to-purple-700">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Get In <span className="text-orange-500">Touch</span>
                        </h1>
                        <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
                            We're here to help and answer any question you might have.
                            We look forward to hearing from you.
                        </p>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <div className="w-96 h-96 bg-white opacity-5 rounded-full"></div>
                </div>
                <div className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2">
                    <div className="w-64 h-64 bg-white opacity-5 rounded-full"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {contactData.map((item, index) => (
                        <ContactCard
                            key={index}
                            item={item}
                            index={index}
                            isActive={activeCard === index}
                            onClick={() => setActiveCard(index)}
                        />
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Send us a Message</h2>
                            <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <MessageSquare className="absolute left-3 top-4 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={6}
                                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-yellow-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center group"
                            >
                                <Send className="mr-2 group-hover:translate-x-1 transition-transform" size={20} />
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Map Section */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Find Us Here</h2>
                            <p className="text-gray-600">Visit our office in Uttara, Dhaka for in-person consultations.</p>
                        </div>

                        <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.4043469632947!2d90.39230761536281!3d23.875698584547876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5d05e7074dd%3A0x4aa30e180871c5b6!2sUttara%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1691234567890!5m2!1sen!2sbd"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-2xl"
                                title="ITET Office Location"
                            ></iframe>

                            {/* Map overlay info */}
                            <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                                <div className="flex items-center">
                                    <MapPin className="text-red-500 mr-2" size={20} />
                                    <div>
                                        <p className="font-semibold text-gray-800">ITET BD Office</p>
                                        <p className="text-sm text-gray-600">H-6, R-2, S-11, Uttara, Dhaka</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;