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
                types: 'lines',
                tagName: 'div',
                lineClass: 'line',
            });
            const text = new SplitType('.header-text p', {
                types: 'lines',
                tagName: 'div',
                lineClass: 'line',
            });

            // Animate h1 lines
            heroText.lines?.forEach((line) => {
                const content = line.innerHTML;
                line.innerHTML = `<span>${content}</span>`;
            });

            gsap.set('.header-text h1 .line span', {
                y: 400,
                display: 'block',
            });

            gsap.to('.header-text h1 .line span', {
                y: 0,
                duration: 1.5,
                stagger: 0.1,
                ease: 'power4.out',
                delay: 0.5,
            });

            // paragraph lines
            text.lines?.forEach((line) => {
                const content = line.innerHTML;
                line.innerHTML = `<span>${content}</span>`;
            });

            gsap.set('.header-text p .line span', {
                y: 400,
                display: 'block',
            });

            gsap.to('.header-text p .line span', {
                y: 0,
                duration: 2,
                stagger: 0.075,
                ease: 'power4.out',
                delay: 0.25,
            });

            return () => {
                if (heroText) heroText.revert();
                if (text) text.revert();
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
