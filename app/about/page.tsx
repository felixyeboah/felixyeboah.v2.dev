'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { AboutHeader } from './about-header';
import { FunThings } from './fun-things';
import { PhotosSection } from './photos-section';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
    const mainRef = useRef(null);

    useGSAP(() => {
        const sections = document.querySelectorAll('.animate-section');

        sections.forEach((section) => {
            gsap.from(section, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    end: "top 40%",
                    toggleActions: "play none none none"
                }
            });
        });
    }, { scope: mainRef });

    return (
        <div className="relative">
            <AboutHeader />
            <main ref={mainRef} className="container mx-auto lg:pt-44">
                <div className="animate-section">
                    <PhotosSection />
                </div>
                <div className="animate-section">
                    <FunThings />
                </div>
                {/* <div className="animate-section lg:py-32">
                    <div className="grid grid-cols-12">
                        <div className="col-span-7"></div>
                        <div className="col-span-4 col-start-8">
                            <h3 className="text-3xl underline underline-offset-8">
                                Why work with me?
                            </h3>
                            <div>
                                <div>
                                    <h5></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </main>
        </div>
    );
};

export default AboutPage;
