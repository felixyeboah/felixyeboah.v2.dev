'use client';

import useScrollCounter from '@/core/hooks/useScrollCounter';
import { cn } from '@/lib/utils';
import { useTransitionRouter } from 'next-view-transitions';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

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
    { name: 'Uses', to: '/uses', height: '30vh', bg: 'bg-[#777671]' },
    // { name: 'Bookmarks', to: '/bookmarks', height: '45vh', bg: 'bg-[#908f8b]' },
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
        if (isActive) setIsActive(false);
    }, [isActive, pathname]);

    return (
        <nav
            ref={header as React.RefObject<HTMLDivElement>}
            className={cn(
                'fixed flex z-50 font-mono top-0 h-20 w-full bg-[#232323]/90 backdrop-blur-md border-t border-b border-[#393939]',
            )}
        >
            {/* Corner + Icons for the entire Nav - Removed bg color */}
            <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 px-1 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
            <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 px-1 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
            <div className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 px-1 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>
            <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 px-1 z-10"><span className="text-[#6B6B6B] text-lg font-thin">+</span></div>

            {/* Logo Box */}
            <div className={cn(
                "flex-1 border-r border-[#393939] relative p-4 flex items-center justify-center transition-colors duration-200 hover:bg-[#303030]",
                pathname === '/' && "bg-[#1b1b1b]"
            )}>
                {/* Intersection + Icons for Logo Box Right Border - Removed bg color */}
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

            {/* Navigation Links Box Container */}
            <ul className="flex flex-[3] h-full">
                {LINKS.map((link, index) => (
                    <li key={link.to} className={cn(
                        "flex-1 border-r border-[#393939] relative p-4 flex items-center justify-center last:border-r-0 transition-colors duration-200 hover:bg-[#303030]",
                        pathname === link.to && "bg-[#1b1b1b]"
                    )}>
                        {/* Intersection + Icons for Nav Link Right Border (don't add on the very last edge) - Removed bg color */}
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
                            <p
                                className={cn(
                                    'block lowercase transition-all duration-300 text-white text-center'
                                )}
                            >
                                {link.name}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>

            {/* <Button
                onClick={() => setIsActive(!isActive)}
                variant="outline"
                className="menu-button"
            >
                {[0, 1].map((i) => (
                    <p
                        key={i}
                        className="block relative top-0 transition-all duration-300 h-full font-semibold leading-[40px] text-[var(--color-tertiary)]"
                    >
                        {isActive ? 'Close' : 'Menu'} ✦
                    </p>
                ))}
            </Button> */}
        </nav>
    );
};
