'use client';

import { ReactNode, useEffect } from 'react';
import Link from 'next/link';

import { Header } from './header/header';
import { Footer } from './footer';

const Wrapper = ({
    children,
    ...props
}: React.ComponentPropsWithRef<'main'>) => (
    <main
        className="transition-[0.5s] bg-background"
        {...props}
    >
        {children}
    </main>
);

export const ClientLayout = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
        let locomotiveScroll: any;

        const initScroll = async () => {
            try {
                const LocomotiveScroll = (await import('locomotive-scroll'))
                    .default;
                locomotiveScroll = new LocomotiveScroll({
                    lenisOptions: {
                        wrapper: document.querySelector(
                            '[data-scroll-container]',
                        ) as HTMLElement,
                        content: document.querySelector(
                            '[data-scroll-content]',
                        ) as HTMLElement,
                        lerp: 0.1,
                        duration: 1.2,
                        orientation: 'vertical',
                        gestureOrientation: 'vertical',
                        smoothWheel: true,
                        wheelMultiplier: 1,
                        touchMultiplier: 2,
                    },
                });

                // Optional: Reset scroll position
                window.scrollTo(0, 0);
            } catch (error) {
                console.error(
                    'Locomotive Scroll initialization failed:',
                    error,
                );
            }
        };

        initScroll();

        return () => {
            if (locomotiveScroll) {
                locomotiveScroll.destroy();
            }
        };
    }, []);

    return (
        <Wrapper data-scroll-container>
            <div data-scroll-content className="font-sans">
                <Header />
                {children}
                <Footer />
            </div>
        </Wrapper>
    );
};
