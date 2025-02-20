'use client';

import useScrollCounter from '@/core/hooks/useScrollCounter';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useRef } from 'react';

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
    // Update ref type
    const header = useRef<HTMLDivElement>(null);
    const reached = useScrollCounter(offsetHeight / 2);

    return (
        <header
            ref={header as React.RefObject<HTMLDivElement>}
            className={cn(
                'fixed flex items-center justify-between z-50 font-mono top-0 h-20 px-10 w-full',
                {
                    'bg-white/20 backdrop-blur-xl': reached,
                },
            )}
        >
            <Link
                aria-label="Home"
                aria-describedby="hometooltip"
                data-testid="header-logo"
                href="/"
                passHref
            >
                <h3 className="text-xl lowercase font-medium hover:text-[#FF7009] underlined">
                    Felix
                </h3>
            </Link>

            <ul className="flex items-center gap-8">
                {LINKS.map((link) => (
                    <li key={link.to}>
                        <Link
                            href={link.to}
                            className="block w-full h-full hover:text-[#FF7009] underlined"
                        >
                            <p className="block lowercase relative top-0 transition-all duration-300 h-full">
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
        </header>
    );
};
