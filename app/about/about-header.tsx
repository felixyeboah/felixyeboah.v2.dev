'use client';

import { loader } from '@/app/libs/next-image-loader';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const AboutHeader = () => {
    const [isLoading, setLoading] = useState(true);

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

                        <div className="col-span-full mb-12 lg:col-span-4 lg:mb-0 space-y-8">
                            <h3 className="dark:text-gray-100 dark:leading-snug text-2xl">
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
                                            </svg>{' '}
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
                                            </svg>{' '}
                                        </div>
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
