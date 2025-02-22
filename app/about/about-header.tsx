'use client';

import { loader } from '@/app/libs/next-image-loader';
import { Button } from '@/core/components/ui/button';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { MoveDownRight, MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect, useRef } from 'react';

export const AboutHeader = () => {
    const [isLoading, setLoading] = useState(true);

    const animation = useRef<gsap.core.Timeline | null>(null);
    const leftIconRef = useRef<HTMLDivElement>(null);
    const rightIconRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Run this effect immediately to hide the left icon before any rendering
    useEffect(() => {
        // Critical: Apply styles to prevent flash before React finishes rendering
        if (typeof document !== 'undefined') {
            const style = document.createElement('style');
            style.innerHTML = `
                .left-icon-initial-state {
                    opacity: 0 !important;
                    width: 0 !important;
                    transform: scale(0) !important;
                }
            `;
            document.head.appendChild(style);
        }
    }, []);

    useEffect(() => {
        if (!leftIconRef.current || !rightIconRef.current || !buttonRef.current)
            return;

        // Immediate set with no delay or animation
        gsap.set(leftIconRef.current, {
            scale: 0,
            width: 0,
            opacity: 0,
            transformOrigin: 'center',
            immediateRender: true,
            overwrite: 'auto',
        });

        gsap.set(rightIconRef.current, {
            scale: 1,
            opacity: 1,
            transformOrigin: 'center',
            immediateRender: true,
            overwrite: 'auto',
        });

        // Create master timeline
        animation.current = gsap
            .timeline({
                paused: true,
                defaults: { duration: 0.6, ease: 'power3.inOut' },
            })
            .to(
                leftIconRef.current,
                {
                    width: 64,
                    scale: 1,
                    opacity: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ease: 'back.out(1.2)',
                },
                0,
            )
            .to(
                buttonRef.current,
                {
                    x: 0,
                    ease: 'expo.out',
                },
                0,
            )
            .to(
                rightIconRef.current,
                {
                    scale: 0,
                    opacity: 0,
                    duration: 0.4,
                },
                0,
            )
            .fromTo(
                leftIconRef.current,
                {
                    rotation: -15,
                },
                {
                    rotation: 0,
                    ease: 'elastic.out(1.2, 0.5)',
                },
                0,
            )
            .to(
                buttonRef.current,
                {
                    scale: 1.02,
                    duration: 0.3,
                },
                0,
            );

        // Text animation
        animation.current.to(
            buttonRef.current.querySelector('span'),
            {
                x: -8,
                duration: 0.4,
            },
            0,
        );
    }, []);

    const handleHover = () => {
        // Reset and play from beginning each time
        if (animation.current) {
            animation.current.pause().progress(0).play();
        }
    };

    const handleLeave = () => {
        if (!leftIconRef.current || !rightIconRef.current || !buttonRef.current)
            return;

        // Create a new reverse timeline each time for consistency
        const reverseAnim = gsap.timeline({
            defaults: { duration: 0.5, ease: 'power2.inOut' },
        });

        // Add all reverse animations to this timeline
        reverseAnim
            .to(
                leftIconRef.current,
                {
                    scale: 0,
                    width: 0,
                    opacity: 0,
                    ease: 'back.out(0.5)',
                },
                0,
            )
            .to(
                rightIconRef.current,
                {
                    scale: 1,
                    opacity: 1,
                    ease: 'power3.out', // Smooth cubic easing without bounce
                    duration: 0.5,
                },
                0,
            )
            .to(
                buttonRef.current,
                {
                    scale: 1,
                    x: 0,
                    ease: 'power2.out',
                },
                0,
            )
            .to(
                buttonRef.current.querySelector('span'),
                {
                    x: 0,
                    duration: 0.4,
                    ease: 'power2.out',
                },
                0,
            );

        // Play the timeline immediately
        reverseAnim.play();
    };

    return (
        <header className="h-screen pt-28">
            <div className="container mx-auto grid grid-cols-12 gap-6">
                <div className="col-span-full md:col-span-6 space-y-5">
                    <div className="flex flex-col h-full items-center justify-between">
                        <div>
                            <h1>
                                <span className="text-5xl md:text-8xl font-bold">
                                    Hi
                                </span>
                            </h1>
                            <h1>
                                <span className="text-5xl md:text-8xl font-bold">
                                    I&apos;m Felix.
                                </span>
                            </h1>

                            <p>
                                <span className="text-xl md:text-2xl">
                                    - A software developer. I build things for
                                    the web and mobile. I consider myself a
                                    learner, a life-long learner. And over the
                                    years, I’ve been building functional,
                                    beautiful interfaces and experiences that
                                    leave a positive impact on people and
                                    businesses.
                                </span>
                            </p>
                        </div>

                        <div>
                            <div className="col-span-full mb-12 lg:col-span-4 lg:mb-0">
                                <h3 className="dark:text-gray-100 dark:leading-snug text-2xl">
                                    After High School in 2011, I wanted to
                                    further my education to the university but
                                    the financial burden was too much for my
                                    parents to bear. I had to find a way to make
                                    money to support my myself. I started
                                    learning how to code on my own in 2012 and
                                    got my first job as a software developer in
                                    2016 but before that, I was mostly working
                                    as a freelancer. I have been working as a
                                    software developer since then.
                                </h3>
                            </div>
                            <div className="mt-10" ref={containerRef}>
                                <Link
                                    href="/blog/how-i-got-here-pt-2-the-software-development-journey"
                                    className="flex items-center"
                                >
                                    <div
                                        ref={leftIconRef}
                                        className="hidden text-white rounded-full bg-primary overflow-hidden h-16"
                                    >
                                        <MoveRight className="min-w-max" />
                                    </div>

                                    <Button
                                        ref={buttonRef}
                                        className="bg-black rounded-full h-14 px-8 text-lg relative overflow-hidden cursor-pointer hover:bg-black"
                                        onMouseEnter={handleHover}
                                        onMouseLeave={handleLeave}
                                    >
                                        <span className="button-content relative z-10">
                                            Read my full story
                                        </span>
                                    </Button>

                                    <div
                                        ref={rightIconRef}
                                        className="flex items-center justify-center text-white size-16 rounded-full bg-secondary"
                                    >
                                        <MoveDownRight />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-full md:col-span-6">
                    <div className="h-[600px] lg:h-[85vh] overflow-hidden rounded-lg relative">
                        <Image
                            src="felixyeboah.dev/IMG_7337_tmsrzq"
                            alt=""
                            fill={true}
                            className={cn(
                                'group-hover:opacity-75 duration-700 ease-in-out',
                                isLoading
                                    ? 'grayscale blur-2xl scale-110'
                                    : 'grayscale-0 blur-0 scale-100',
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
        </header>
    );
};
