'use client';

import { FrontMatterPost } from '@/types/post';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { cn } from '../libs/misc';
import { loader } from '../libs/next-image-loader';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import gsap from 'gsap';

export const Header = ({ page }: { page: FrontMatterPost }) => {
    const [isLoading, setLoading] = useState(true);

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
        <header className="header-text flex flex-col gap-8 items-center justify-center py-16 md:py-24" ref={container}>
            <h1 className="block text-4xl md:text-6xl font-bold text-white text-center">
                {page?.frontMatter.title}
            </h1>

            <div className="md:w-8/12 mx-auto">
                {page?.frontMatter?.subtitle ? (
                    <p className="text-lg md:text-xl text-primary text-center">
                        {page?.frontMatter?.subtitle}
                    </p>
                ) : null}
            </div>

            {page?.frontMatter?.cover ? (
                <div className="relative w-full rounded-xl overflow-hidden mt-8">
                    <Image
                        src={page?.frontMatter?.cover}
                        alt={page?.frontMatter?.title}
                        width={1200}
                        height={1200}
                        loader={loader}
                        className={cn(
                            'w-full h-auto md:h-[500px] rounded-xl group-hover:opacity-75 duration-700 ease-in-out',
                            isLoading
                                ? 'blur-2xl scale-110'
                                : 'blur-0 scale-100',
                        )}
                        style={{
                            objectFit: 'cover',
                        }}
                        onLoad={() => setLoading(false)}
                        sizes="(max-width:1023px) 80vw,
                        (min-width:1024px) and (max-width:1620px) 67vw,
                        1100px"
                    />
                </div>
            ) : null}
        </header>
    );
};
