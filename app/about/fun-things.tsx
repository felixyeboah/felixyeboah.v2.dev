'use client';

import { loader } from '@/app/libs/next-image-loader';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export const FunThings = () => {
    const [isLoading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.to(imageRef.current, {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 min-h-screen py-14 sm:py-16 lg:py-20">
            <div className="lg:col-span-6 order-2 lg:order-1" ref={containerRef}>
                <div className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-full mb-8 lg:mb-0 overflow-hidden rounded-lg relative">
                    <div
                        ref={imageRef}
                        className="absolute inset-0 h-[120%] w-full"
                    >
                        <Image
                            src="felixyeboah.dev/IMG_7341_dqpzxu"
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
            <div className="lg:col-span-6 order-1 lg:order-2">
                <div className="max-w-xl mx-auto lg:ml-0 px-4 sm:px-6 lg:px-0 space-y-8">
                    <h2>
                        <span className="block text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-white">
                            Some fun things you should know about me
                        </span>
                    </h2>

                    <div className="space-y-8">
                        <div>
                            <h3>
                                <span className="block text-xl sm:text-2xl font-semibold mb-4 text-gray-100">
                                    Eye for design
                                </span>
                            </h3>
                            <p>
                                <span className="block text-base sm:text-lg md:text-xl mb-8 text-gray-300">
                                    I have a keen eye for design and I love to create
                                    beautiful and easy to use interfaces. I have a good
                                    understanding of design principles and I am able to
                                    create beautiful and functional interfaces that are
                                    easy to use.
                                </span>
                            </p>
                        </div>

                        <div>
                            <h3>
                                <span className="block text-xl sm:text-2xl font-semibold mb-4 text-gray-100">
                                    My experience
                                </span>
                            </h3>

                            <div className="space-y-4">
                                <p className="text-base sm:text-lg md:text-xl text-gray-300">
                                    Currently, I build solutions at{' '}
                                    <a
                                        href="https://completefarmer.com"
                                        rel="noreferrer"
                                        target="_blank"
                                        className="text-[#2D68FF] hover:underline"
                                    >
                                        Complete Farmer
                                    </a>{' '}
                                    to connect farmers to global food buyers and growing
                                    with them to give them a competitive edge across the
                                    supply chain.
                                </p>
                                <p className="text-base sm:text-lg md:text-xl text-gray-300">
                                    I worked as a contractor for a few months at a UK
                                    based startup called{' '}
                                    <a
                                        href="https://primer.io"
                                        rel="noreferrer"
                                        target="_blank"
                                        className="text-[#2D68FF] hover:underline"
                                    >
                                        Primer API Limited
                                    </a>{' '}
                                    as a frontend engineer contributing directly to the
                                    success and growth of the product area. Working
                                    closely with Product, Design, and Engineering teams
                                    to bring elegant and intuitive experiences to life
                                    Being heavily involved in key technology decisions
                                    and features, building for scale, and optimizing for
                                    output.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3>
                                <span className="block text-xl sm:text-2xl font-semibold mb-4 text-gray-100">
                                    My hobbies
                                </span>
                            </h3>

                            <p className="text-base sm:text-lg md:text-xl text-gray-300">
                                In my spare time, you&lsquo;ll find me either
                                learning something new, playing COD or FC24. I like
                                listening to music, watching movies and traveling
                                which helps me understand life and approach problems
                                in different ways while shooting stunning photos. I
                                love cooking and baking which helps me relax and
                                unwind.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
