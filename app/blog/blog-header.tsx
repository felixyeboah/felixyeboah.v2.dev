'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import SplitType from 'split-type';

export const BlogHeader = () => {
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
                opacity: 0,
                visibility: 'hidden',
            });

            gsap.to(heroText.chars, {
                y: 0,
                opacity: 1,
                visibility: 'visible',
                duration: 1,
                stagger: 0.075,
                ease: 'power4.out',
                delay: 1,
            });

            // paragraph lines
            text.lines?.forEach((line) => {
                const content = line.innerHTML;
                line.innerHTML = `<span>${content}</span>`;
            });

            gsap.set('.header-text p .line span', {
                y: 400,
                display: 'block',
                opacity: 0,
                visibility: 'hidden',
            });

            gsap.to('.header-text p .line span', {
                y: 0,
                opacity: 1,
                visibility: 'visible',
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
        <header className="h-[20vh] header-text overflow-visible" ref={container}>
            <h1 className="lg:text-[100px] text-white">Blog</h1>
            <p className="text-2xl text-gray-300">Find the latest of my writing here.</p>
        </header>
    );
};
