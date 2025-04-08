'use client';

import useScrollCounter from '@/core/hooks/useScrollCounter';
import { cn } from '@/lib/utils';
import { useTransitionRouter } from 'next-view-transitions';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LINKS = [
    {
        name: 'About',
        to: '/about',
    },
    {
        name: 'Case Studies',
        to: '/case-studies',
        height: '75vh',
        bg: 'bg-[#c1c1bf]',
    },
    {
        name: 'Blog',
        to: '/blog',
    },
    { name: 'Bookmarks', to: '/bookmarks', height: '45vh', bg: 'bg-[#908f8b]' },
    { name: 'Uses', to: '/uses', height: '30vh', bg: 'bg-[#777671]' },
    { name: 'Resume', to: '/resume', height: '60vh', bg: 'bg-[#a9a8a5]' },
    // {
    //     name: 'Memory Lane',
    //     to: '/memory-lane',
    //     height: '15vh',
    //     bg: 'bg-[#5d5b57]',
    // },
];

const offsetHeight = 120;

export const Header = () => {
    const pathname = usePathname();
    const header = useRef<HTMLDivElement>(null);
    const reached = useScrollCounter(offsetHeight / 2);
    const [isActive, setIsActive] = useState<boolean>(false);

    const router = useTransitionRouter();

    const slideOut = () => {
        document.documentElement.animate(
            [
                {
                    opacity: 1,
                    transform: 'translateY(0)',
                },
                {
                    opacity: 0.2,
                    transform: 'translateY(-35%)',
                },
            ],
            {
                duration: 1500,
                easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
                fill: 'forwards',
                pseudoElement: '::view-transition-old(root)',
            },
        );

        document.documentElement.animate(
            [
                {
                    clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                },
                {
                    clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
                },
            ],
            {
                duration: 1500,
                easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
                fill: 'forwards',
                pseudoElement: '::view-transition-new(root)',
            },
        );
    };

    useEffect(() => {
        setIsActive(false);
    }, [pathname]);

    return (
        <nav
            ref={header as React.RefObject<HTMLDivElement>}
            className={cn(
                'fixed flex z-50 font-mono top-0 h-20 w-full bg-[#232323]/90 backdrop-blur-md border-t border-b border-[#393939]',
            )}
        >
            {/* Corner + Icons for the entire Nav */}
            <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 px-1 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
            <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 px-1 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
            <div className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 px-1 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
            <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 px-1 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>

            {/* Logo Box */}
            <div className={cn(
                "flex-1 border-r border-[#393939] relative p-4 flex items-center justify-center transition-colors duration-200 hover:bg-[#303030]",
                pathname === '/' && "bg-[#1b1b1b]"
            )}>
                {/* Intersection + Icons for Logo Box Right Border */}
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 px-1 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
                <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 px-1 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>

                <Link
                    aria-label="Home"
                    aria-describedby="hometooltip"
                    data-testid="header-logo"
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        router.push('/', {
                            onTransitionReady: slideOut,
                        });
                    }}
                    className="flex items-center justify-center h-full w-full"
                >
                    <h3 className="text-xl lowercase font-medium text-white">
                        Felix
                    </h3>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex flex-[3] h-full">
                {LINKS.map((link, index) => (
                    <li key={link.to} className={cn(
                        "flex-1 border-r border-[#393939] relative p-4 flex items-center justify-center last:border-r-0 transition-colors duration-200 hover:bg-[#303030]",
                        pathname === link.to && "bg-[#1b1b1b]"
                    )}>
                        {index < LINKS.length - 1 && (
                            <>
                                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 px-1 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
                                <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 px-1 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
                            </>
                        )}

                        <Link
                            href={link.to}
                            className="block w-full h-full flex items-center justify-center"
                            onClick={(e) => {
                                e.preventDefault();
                                router.push(link.to, {
                                    onTransitionReady: slideOut,
                                });
                            }}
                        >
                            <p className={cn(
                                'block lowercase transition-all duration-300 text-white text-center'
                            )}>
                                {link.name}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Hamburger Menu Button */}
            <button
                onClick={() => setIsActive(!isActive)}
                className="md:hidden grid place-items-center w-20 h-20 border-l border-[#393939] relative transition-colors duration-200 hover:bg-[#303030]"
                aria-label={isActive ? 'Close menu' : 'Open menu'}
            >
                <div className="w-6 h-4 relative">
                    <span
                        className={cn(
                            "absolute left-0 h-[2px] w-full bg-white transform-gpu transition-all duration-300 ease-in-out origin-center",
                            isActive
                                ? "top-1/2 -translate-y-1/2 rotate-45"
                                : "top-0"
                        )}
                    />
                    <span
                        className={cn(
                            "absolute left-0 h-[2px] w-full bg-white transform-gpu transition-all duration-300 ease-in-out origin-center",
                            isActive
                                ? "top-1/2 -translate-y-1/2 -rotate-45"
                                : "top-[6px]"
                        )}
                    />
                </div>
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{
                            height: "calc(100vh - 5rem)",
                            transition: {
                                duration: 0.3,
                                ease: [0.4, 0, 0.2, 1]
                            }
                        }}
                        exit={{
                            height: 0,
                            transition: {
                                delay: 0.5,
                                duration: 0.3,
                                ease: [0.4, 0, 0.2, 1]
                            }
                        }}
                        className="fixed inset-0 top-20 bg-[#232323] border-t border-[#393939] md:hidden overflow-hidden"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: { duration: 0.2 }
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 0.2,
                                    delay: 0.3
                                }
                            }}
                            className="m-4 border border-[#393939] relative h-[calc(100%-2rem)]"
                        >
                            {/* Corner + Icons for Mobile Menu Box */}
                            <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 px-1 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
                            <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 px-1 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
                            <div className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 px-1 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
                            <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 px-1 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>

                            <motion.ul
                                className="flex flex-col divide-y divide-[#393939]"
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={{
                                    open: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.1
                                        }
                                    },
                                    closed: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            staggerDirection: -1,
                                            delayChildren: 0.1
                                        }
                                    }
                                }}
                            >
                                {LINKS.map((link, index) => (
                                    <motion.li
                                        key={link.to}
                                        className="relative"
                                        variants={{
                                            open: {
                                                y: 0,
                                                opacity: 1,
                                                transition: {
                                                    y: { type: "spring", stiffness: 300, damping: 30 },
                                                    opacity: { duration: 0.2 }
                                                }
                                            },
                                            closed: {
                                                y: 50,
                                                opacity: 0,
                                                transition: {
                                                    y: { type: "spring", stiffness: 200, damping: 30 },
                                                    opacity: { duration: 0.2 }
                                                }
                                            }
                                        }}
                                    >
                                        {/* Intersection + Icons for each nav item */}
                                        {index > 0 && (
                                            <>
                                                <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 px-1 z-10">
                                                    <span className="text-[#6B6B6B] text-lg font-thin">+</span>
                                                </div>
                                                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 px-1 z-10">
                                                    <span className="text-[#6B6B6B] text-lg font-thin">+</span>
                                                </div>
                                            </>
                                        )}
                                        <Link
                                            href={link.to}
                                            className={cn(
                                                "block text-lg text-white hover:bg-[#303030] transition-colors duration-200 p-6",
                                                pathname === link.to && "bg-[#1b1b1b]"
                                            )}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsActive(false);
                                                router.push(link.to, {
                                                    onTransitionReady: slideOut,
                                                });
                                            }}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
