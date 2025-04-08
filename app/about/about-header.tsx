'use client';

import { loader } from '@/app/libs/next-image-loader';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import SplitType from 'split-type';

export const AboutHeader = () => {
    const [isLoading, setLoading] = useState(true);
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const heroText = new SplitType('.header-text h1', {
                types: 'chars',
            });
            const text = new SplitType('.header-text p', {
                types: 'lines',
                tagName: 'div',
                lineClass: 'line',
            });
            gsap.set(heroText.chars, {
                y: 400,
            });

            gsap.to(heroText.chars, {
                y: 0,
                duration: 1,
                stagger: 0.055,
                ease: 'power4.out',
                delay: 1,
            });

            text.lines?.forEach((line) => {
                const content = line.innerHTML;
                line.innerHTML = `<span>${content}</span>`;
            });

            gsap.set('.header-text p .line span', {
                y: 400,
                display: 'inline-block',
                position: 'relative',
                overflow: 'hidden',
            });

            gsap.to('.header-text p .line span', {
                y: 0,
                duration: 2,
                stagger: 0.075,
                ease: 'power4.out',
                delay: 0.25,
            });

            return () => {
                if (text) text.revert();
                if (heroText) heroText.revert();
            };
        },
        {
            scope: container,
        },
    );

    return (
        <header className="min-h-screen header-text text-white" ref={container}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 py-24 md:pt-28">
                    <div className="md:col-span-6 space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h1 className="overflow-hidden">
                                    <span className="block text-6xl sm:text-7xl lg:text-8xl font-bold">
                                        Hi
                                    </span>
                                </h1>
                                <h1 className="overflow-hidden">
                                    <span className="block text-6xl sm:text-7xl lg:text-8xl font-bold">
                                        I&apos;m Felix.
                                    </span>
                                </h1>
                            </div>

                            <div className="text-xl md:text-2xl space-y-4">
                                <p>
                                    - A software developer. I build things for
                                    the web and mobile.
                                </p>
                                <p>
                                    I consider myself a learner, a life-long
                                    learner.
                                </p>
                                <p>
                                    And over the years, I've been building
                                    functional, beautiful interfaces and
                                    experiences that leave a positive impact on
                                    people and businesses.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-lg md:text-xl text-gray-100 leading-relaxed">
                                After High School in 2011, I wanted to further
                                my education to the university but the financial
                                burden was too much for my parents to bear. I
                                had to find a way to make money to support my
                                myself. I started learning how to code on my own
                                in 2012 and got my first job as a software
                                developer in 2016 but before that, I was mostly
                                working as a freelancer. I have been working as
                                a software developer since then.
                            </h3>

                            <div className="btn-row fade-in">
                                <Link
                                    href="/blog/how-i-got-here-pt-2-the-software-development-journey"
                                    className="btn btn-animate"
                                >
                                    <div className="arrow first">
                                        <div className="arrow-fill"></div>
                                        <div className="arrow-content">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <polyline
                                                    points="18 8 18 18 8 18"
                                                    fill="none"
                                                    stroke="#000"
                                                    strokeMiterlimit="10"
                                                ></polyline>
                                                <line
                                                    x1="18"
                                                    y1="18"
                                                    x2="5"
                                                    y2="5"
                                                    fill="none"
                                                    stroke="#000"
                                                    strokeMiterlimit="10"
                                                ></line>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="btn-content">
                                        <div className="btn-fill"></div>
                                        <div className="btn-text">
                                            <span>Read my full story</span>
                                        </div>
                                    </div>
                                    <div className="arrow second">
                                        <div className="arrow-fill"></div>
                                        <div className="arrow-content">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <polyline
                                                    points="18 8 18 18 8 18"
                                                    fill="none"
                                                    stroke="#000"
                                                    strokeMiterlimit="10"
                                                ></polyline>
                                                <line
                                                    x1="18"
                                                    y1="18"
                                                    x2="5"
                                                    y2="5"
                                                    fill="none"
                                                    stroke="#000"
                                                    strokeMiterlimit="10"
                                                ></line>
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-6">
                        <div className="h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-lg relative">
                            <Image
                                src="felixyeboah.dev/IMG_7337_tmsrzq"
                                alt="Felix Yeboah"
                                fill={true}
                                className={cn(
                                    'group-hover:opacity-75 duration-700 ease-in-out',
                                    isLoading
                                        ? 'grayscale blur-2xl scale-110'
                                        : 'grayscale-0 blur-0 scale-100'
                                )}
                                style={{
                                    objectFit: 'cover',
                                }}
                                loader={loader}
                                onLoad={() => setLoading(false)}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
