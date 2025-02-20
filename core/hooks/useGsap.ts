'use client';

import gsap from 'gsap';
import { RefObject } from 'react';

interface UseGsapMenuProps {
    menuRef: RefObject<HTMLDivElement | null>;
    menuContentRef: RefObject<HTMLDivElement | null>;
    menuItemsRef: RefObject<HTMLLIElement[]>;
    topMenuRef: RefObject<HTMLDivElement | null>;
    isActive: boolean;
}

export const useGsapMenu = ({
    menuRef,
    menuContentRef,
    menuItemsRef,
    topMenuRef,
    isActive,
}: UseGsapMenuProps) => {
    const menu = menuRef.current;
    const menuContent = menuContentRef.current;
    const menuItems = menuItemsRef.current;

    if (!menu || !menuContent || !menuItems?.length) return;

    const ctx = gsap.context(() => {
        gsap.killTweensOf([menu, menuItems]);

        if (isActive) {
            gsap.set(menu, {
                display: 'block',
                height: 0,
                backgroundColor: 'transparent',
                opacity: 0,
            });

            // Set initial state for all animations
            gsap.set([menuItems, topMenuRef.current], {
                y: '100vh',
                opacity: 0,
                display: 'block',
            });

            const tl = gsap.timeline();
            tl.to(menu, {
                height: '100vh',
                backgroundColor: '#282724',
                opacity: 1,
                duration: 1,
                ease: 'power2.inOut',
            })
                .to(
                    topMenuRef.current,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power3.out',
                    },
                    '-=0.2',
                )
                .to(
                    menuItems,
                    {
                        y: 0,
                        opacity: 1,
                        stagger: {
                            each: 0.05, // Reduced from 0.08
                            from: 'end',
                            ease: 'power4.out',
                        },
                        duration: 0.6, // Reduced from 1
                        ease: 'power4.out',
                    },
                    '-=0.3',
                ); // Start sooner
        } else {
            const tl = gsap.timeline();
            tl.to(topMenuRef.current, {
                y: -50,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.inOut',
            })
                .to(menuItems, {
                    y: '100vh',
                    stagger: 0.09,
                    duration: 0.5,
                    ease: 'power2.inOut',
                })
                .to(
                    menu,
                    {
                        backgroundColor: 'transparent',
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power2.inOut',
                        onComplete: () => {
                            gsap.set(menu, {
                                height: 0,
                                display: 'none',
                            });
                        },
                    },
                    '-=0.4',
                )
                .to(
                    menu,
                    {
                        height: 0,
                        duration: 0.6, // Increased duration for smoother transition
                        ease: 'power2.inOut', // Changed easing for smoother effect
                        onComplete: () => {
                            gsap.set(menu, { display: 'none' });
                        },
                    },
                    '-=0.3',
                ); // Overlapping animations for smoother effect
        }

        // Hover animations
        menuItems.forEach((item) => {
            const hoverTl = gsap.timeline({ paused: true });
            hoverTl.to(item, {
                height: '+=7vh',
                duration: 0.3,
                ease: 'power2.out',
            });

            item.addEventListener('mouseenter', () => hoverTl.play());
            item.addEventListener('mouseleave', () => hoverTl.reverse());
        });

        return () => ctx.revert();
    });
};
