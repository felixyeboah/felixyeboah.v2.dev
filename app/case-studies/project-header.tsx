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
            className="page-header header-text flex flex-col items-center justify-center h-[50vh] bg-[#003D29] text-background"
            ref={container}
        >
            <div className="w-3/5 space-y-0">
                <h1 className="lg:text-[180px] text-center">Case Studies</h1>
                <p className="text-xl font-medium">
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
