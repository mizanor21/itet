'use client';

import React, { useState } from 'react';
import { Check, Star, Zap } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';

const MembershipPricing = () => {
  const [acceptedTerms, setAcceptedTerms] = useState([false, false, false]);

  interface MembershipItem {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    popular: boolean;
    icon: React.ReactNode;
    textColor: string;
    bg: string;
    link: string;
  }

  const handleTermsChange = (index: number): void => {
    const newAcceptedTerms = [...acceptedTerms];
    newAcceptedTerms[index] = !newAcceptedTerms[index];
    setAcceptedTerms(newAcceptedTerms);
  };

  const itemsData: MembershipItem[] = [
    {
      name: 'General Member (GM)',
      price: '1530 BDT',
      period: '/For 2 Years',
      description: 'For B.Sc Graduates From CTET / BUTEX, Tejgaon Campus',
      features: [
        'Access to all ITET facilities and events.',
        'Eligible for professional training, seminars, and job portals.',
        'Eligibility for certificates, training, and awards.',
        'Network with industry experts and alumni.',
        'Renewable for continued benefits'
      ],
      popular: false,
      icon: <Check className="w-6 h-6" />,
      textColor: 'text-blue-500',
      bg: 'bg-blue-100',
      link: '/general-membership',
    },
    {
      name: 'Life Member (LM)',
      price: '5100 BDT',
      period: '/Lifetime',
      description: 'For B.Sc Graduates From CTET / BUTEX, Tejgaon Campus',
      features: [
        'Enjoy all benefits without renewal hassles – for life!',
        'Priority access to national & international conferences, training, and scholarships',
        'Recognition as a Life Fellow in ITET member directory.',
        'Get exclusive invitations to high-profile industry events & leadership meets.',
        'Perfect for textile leaders who want long-term recognition and contribution.'
      ],
      popular: true,
      icon: <Star className="w-6 h-6" />,
      textColor: 'text-pink-500',
      bg: 'bg-pink-100',
      link: '/lifetime-membership',
    },
    {
      name: 'Re-New Membership',
      price: '1020 BDT',
      period: '/For 2 Years',
      description: 'Only for existing General Members (GM)',
      features: [
        'Maintain your professional credibility as an active ITET member.',
        'Access the members-only portal for job posts, industry news & resources.',
        'Be eligible for upcoming national & international events.',
        'Strengthen your alumni and industry connections.',
        'Regular access to resources or training',
        'Stay informed, stay empowered, stay ITET Strong'
      ],
      popular: false,
      icon: <Zap className="w-6 h-6" />,
      textColor: 'text-cyan-500',
      bg: 'bg-cyan-100',
      link: '/renew-membership',
    },
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
            Choose Your Membership
          </h1>
          <p className="text-lg md:text-xl text-amber-900/80 max-w-2xl mx-auto">
            Unlock the full potential of your projects with our flexible membership plans.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3  gap-20 lg:gap-8">
          {itemsData.map((item, index) => (
            <div
              key={index}
              className={clsx(
                'relative flex flex-col bg-white backdrop-blur-lg rounded-2xl p-8 border transition-all duration-700 group h-full',
                item.popular
                  ? `${item.textColor} shadow-2xl scale-105`
                  : `${item.textColor} shadow-xl `
              )}
            >
              {/* Popular Badge */}
              {item.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="text-white bg-pink-500 px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className="flex-1">
                {/* Icon and Title */}
                <div className="flex gap-3 text-center mb-6">
                  <div
                    className={clsx(
                      'inline-flex items-center justify-center w-10 h-10 rounded-lg',
                      item.popular ? item.bg : item.textColor,
                      item.popular ? item.textColor : item.bg
                    )}
                  >
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className={clsx('text-xl md:text-2xl font-bold mt-1', item.textColor)}>
                    {item.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-800 mb-6">
                  <span className="font-semibold">Eligibility : </span>
                  {item.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className={clsx('text-2xl md:text-3xl font-semibold', item.textColor)}>
                      {item.price}
                    </span>
                    <span className="text-orange-600 font-medium ml-2">{item.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-amber-900/90">
                      <span>
                        <Check
                          className={clsx('w-5 h-5 mr-3 flex-shrink-0 bg-stone-100 rounded-full p-0.5 mt-0.5', item.textColor)}
                        />
                      </span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Section - Fixed at bottom */}
              <div className="mt-auto">
                {/* Terms and Conditions */}
                <div className="flex items-start mb-6">
                  <div className="flex items-center h-5">
                    <input
                      id={`terms-${index}`}
                      name={`terms-${index}`}
                      type="checkbox"
                      checked={acceptedTerms[index]}
                      onChange={() => handleTermsChange(index)}
                      className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor={`terms-${index}`} className="font-medium text-gray-700">
                      By "Applying Now", you agree with ITET constitution and accept all decisions made by the ITET Council
                    </label>
                    {!acceptedTerms[index] && (
                      <p className="text-red-500 text-xs mt-1">You must accept the terms to proceed</p>
                    )}
                  </div>
                </div>

                {/* Button */}
                <Link
                  href={acceptedTerms[index] ? item.link : '#'}
                  className="block w-full"
                  onClick={(e) => !acceptedTerms[index] && e.preventDefault()}
                >
                  <button
                    className={clsx(
                      'w-full py-3 px-4 rounded font-semibold text-md transition-all duration-300 group-hover:scale-105 uppercase',
                      item.textColor,
                      item.bg,
                      'hover:opacity-90',
                      !acceptedTerms[index] && 'opacity-70 cursor-not-allowed'
                    )}
                    disabled={!acceptedTerms[index]}
                  >
                    Apply Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipPricing;