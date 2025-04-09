'use client';

import { loader } from '@/app/libs/next-image-loader';
import { Button } from '@/components/ui/button';
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
                tagName: 'span',
                lineClass: 'text-line',
            });
            const textH3 = new SplitType('.header-text h3', {
                types: 'lines',
                tagName: 'span',
                lineClass: 'h3-line',
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

            gsap.set('.header-text p .text-line', {
                y: '100%',
                opacity: 0,
                display: 'block',
            });

            gsap.to('.header-text p .text-line', {
                y: '0%',
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out',
                delay: 0.35,
            });

            // Calculate delay for H3 animation
            // Paragraph animation: delay=0.35, duration=0.8, stagger=0.1
            // Need number of lines in paragraph. Assuming ~5 lines for calculation:
            const pLines = text.lines?.length || 5; // Get actual or estimate
            const pAnimDuration = 0.35 + 0.8 + (pLines - 1) * 0.1;

            gsap.set('.header-text h3 .h3-line', {
                y: '100%',
                opacity: 0,
                display: 'block',
            });

            gsap.to('.header-text h3 .h3-line', {
                y: '0%',
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out',
                delay: pAnimDuration - 0.5, // Start slightly before p finishes
            });

            return () => {
                if (text) text.revert();
                if (heroText) heroText.revert();
                if (textH3) textH3.revert(); // Revert the h3 SplitType
            };
        },
        {
            scope: container,
        },
    );

    return (
        <header className="min-h-screen header-text text-white" ref={container}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pt-28 pb-20">
                    <div className="md:col-span-6 space-y-8 order-2 md:order-1">
                        <div className="flex flex-col justify-between h-[800px]">
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
                                        - A software developer. I build things for the web and mobile. I consider myself a learner, a life-long learner. And over the years, I've been building functional, beautiful interfaces and experiences that leave a positive impact on people and businesses.
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

                                <Button asChild className='bg-secondary rounded-full text-primary h-14 px-10 hover:bg-secondary'>
                                    <Link
                                        href="/blog/how-i-got-here-pt-2-the-software-development-journey"
                                    >
                                        Read my full story
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-6 order-1 md:order-2">
                        <div className="left-side">
                            <Image
                                src="felixyeboah.dev/IMG_7337_tmsrzq"
                                alt="Felix Yeboah"
                                fill={true}
                                className="left-side__picture"
                                loader={loader}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="left-side__text text text--14 font-secondary">
                                MY STORY
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
