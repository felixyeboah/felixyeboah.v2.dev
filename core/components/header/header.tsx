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
                'fixed flex items-center justify-between z-50 font-mono top-0 h-20 px-10 w-full',
                {
                    'bg-white/20 backdrop-blur-xl': reached,
                    'text-white': pathname === '/',
                    'mix-blend-exclusion': pathname !== '/',
                },
            )}
        >
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
            >
                <h3 className="text-xl lowercase font-medium hover:text-primary underlined text-white">
                    Felix
                </h3>
            </Link>

            <ul className="flex items-center gap-8">
                {LINKS.map((link) => (
                    <li key={link.to}>
                        <Link
                            href={link.to}
                            className="block w-full h-full hover:text-primary underlined"
                            onClick={(e) => {
                                e.preventDefault();
                                router.push(link.to, {
                                    onTransitionReady: slideOut,
                                });
                            }}
                        >
                            <p
                                className={cn(
                                    'block lowercase relative top-0 transition-all duration-300 h-full text-white',
                                    {
                                        'text-primary underline underline-offset-8':
                                            pathname === link.to,
                                    },
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
