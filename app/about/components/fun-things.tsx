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
        <div className="mb-24 grid grid-cols-12 gap-4 h-screen lg:pt-20">
            <div className="col-span-full lg:col-span-6" ref={containerRef}>
                <div className="h-[500px] mb-12 lg:mb-0 overflow-hidden md:h-full rounded-lg relative">
                    <div
                        ref={imageRef}
                        className="absolute inset-0 h-[120%] w-full"
                    >
                        <Image
                            src="felixyeboah.dev/IMG_7341_dqpzxu"
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
            <div className="col-span-full lg:col-span-6">
                <div className="w-[550px] ml-10">
                    <h2 style={{ fontWeight: 'bold' }}>
                        <span className="mb-7 block text-4xl font-bold md:text-4xl">
                            Some fun things you should know about me
                        </span>
                    </h2>

                    <h3>
                        <span className="mb-4 text-2xl block font-semibold">{`Eye for design`}</span>
                    </h3>
                    <p>
                        <span className="block text-xl mb-8">
                            I have a keen eye for design and I love to create
                            beautiful and easy to use interfaces. I have a good
                            understanding of design principles and I am able to
                            create beautiful and functional interfaces that are
                            easy to use.
                        </span>
                    </p>

                    <h3>
                        <span className="block mb-4 text-2xl font-semibold">
                            {`My experience`}
                        </span>
                    </h3>

                    <p>
                        <span className="block mb-4 text-xl">
                            Currently, I build solutions at{' '}
                            <a
                                href="https://completefarmer.com"
                                rel="noreferrer"
                                target="_blank"
                                className="text-red-600"
                            >
                                Complete Farmer
                            </a>{' '}
                            to connect farmers to global food buyers and growing
                            with them to give them a competitive edge across the
                            supply chain.
                        </span>
                    </p>
                    <p>
                        <span className="block mb-8 text-xl">
                            I worked as a contractor for a few months at a UK
                            based startup called{' '}
                            <a
                                href="https://primer.io"
                                rel="noreferrer"
                                target="_blank"
                                className="text-red-600"
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
                        </span>
                    </p>

                    <h3>
                        <span className="block mb-4 text-2xl font-semibold">
                            {`My hobbies`}
                        </span>
                    </h3>

                    <p>
                        <span className="block text-xl">
                            In my spare time, you&lsquo;ll find me either
                            learning something new, playing COD or FC24. I like
                            listening to music, watching movies and traveling
                            which helps me understand life and approach problems
                            in different ways while shooting stunning photos. I
                            love cooking and baking which helps me relax and
                            unwind.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};
