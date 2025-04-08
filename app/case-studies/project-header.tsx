'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import SplitType from 'split-type';

gsap.registerPlugin(useGSAP);

export const ProjectHeader = () => {
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
            });

            gsap.to(heroText.chars, {
                y: 0,
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
            });

            gsap.to('.header-text p .line span', {
                y: 0,
                duration: 2,
                stagger: 0.075,
                ease: 'power4.out',
                delay: 0.25,
            });

            return () => {
                if (text) text.revert();
            };
        },
        {
            scope: container,
        },
    );

    return (
        <header
            className="page-header header-text flex flex-col items-center justify-center min-h-[50vh] text-white px-4 sm:px-6 lg:px-8 py-0 sm:py-14"
            ref={container}
        >
            <div className="w-full sm:w-4/5 space-y-4 sm:space-y-6">
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[180px] text-center leading-tight">Case Studies</h1>
                <p className="text-base sm:text-lg lg:text-xl font-medium text-gray-300 max-w-4xl mx-auto text-center">
                    Showcasing a diverse array of projects, each meticulously
                    designed to engage and delight users across various
                    platforms and devices. From sleek, minimalist interfaces to
                    dynamic, interactive web applications, every work embodies a
                    commitment to excellence and innovation.
                </p>
            </div>
        </header>
    );
};
