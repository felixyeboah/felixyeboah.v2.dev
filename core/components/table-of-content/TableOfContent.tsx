'use client';

import useProgress from '@/core/hooks/useProgress';
import useScrollSpy from '@/core/hooks/useScrollSpy';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

import ProgressBar from './ProgressBar';

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    hidden?: boolean;
}

export const Wrapper: React.FC<WrapperProps> = ({
    children,
    hidden = false,
    ...props
}) => (
    <div
        className={`fixed top-[266px] left-4 flex ${hidden ? 'pointer-events-none' : ''} md:block lg:flex`}
        {...props}
    >
        {children}
    </div>
);

interface TableOfContentProps {
    ids: Array<{ id: string; title: string }>;
}

/**
 * This offset is meant for the smooth scrolling and
 * Scrollspy to take into account the header height
 */
const OFFSET = 150;

const TableOfContent = ({ ids }: TableOfContentProps) => {
    const shouldReduceMotion = useReducedMotion();
    const readingProgress = useProgress();

    /**
     * Only show the table of content between 7% and 95%
     * of the page scrolled.
     */
    const shouldShowTableOfContent =
        readingProgress > 0.07 && readingProgress < 0.95;

    /**
     * Variants handling hidding/showing the table of content
     * based on the amount scrolled by the reader
     */
    const variants = {
        hide: {
            opacity: shouldReduceMotion ? 1 : 0,
        },
        show: (shouldShowTableOfContent: boolean) => ({
            opacity: shouldReduceMotion || shouldShowTableOfContent ? 1 : 0,
        }),
    };

    /**
     * Handles clicks on links of the table of content and smooth
     * scrolls to the corresponding section.
     * @param {React.MouseEvent} event the click event
     * @param {string} id the id of the section to scroll to
     */
    const handleLinkClick = (event: React.MouseEvent, id: string) => {
        event.preventDefault();

        const element = document.getElementById(id)!;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - 100;

        /**
         * Note @MaximeHeckel: This doesn't work on Safari :(
         * TODO: find an alternative for Safari
         */
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    };

    /**
     * Get the index of the current active section that needs
     * to have its corresponding title highlighted in the
     * table of content
     */
    const [currentActiveIndex] = useScrollSpy(
        ids.map(
            (item) =>
                document.querySelector(`section[id="${item.id}-section"]`)!,
        ),
        { offset: OFFSET },
    );

    return (
        <Wrapper hidden={!shouldShowTableOfContent}>
            <ProgressBar progress={readingProgress} />
            {ids.length > 0 ? (
                <ul
                    className="max-w-[200px] flex flex-col m-0 ml-6 p-0 text-text-tertiary list-none lg:block"
                    style={{
                        listStylePosition: 'outside',
                        listStyleImage: 'none',
                    }} // Inline styles for list
                >
                    {ids.map((item, index) => {
                        return (
                            <motion.li
                                initial="hide"
                                variants={variants}
                                animate="show"
                                transition={{ type: 'spring' }}
                                key={item.id}
                                custom={shouldShowTableOfContent}
                                className="list-none text-sm font-normal leading-[1.5] tracking-[0.3px] mb-6 focus:outline-none focus:ring-2 focus:ring-accent focus:opacity-100"
                            >
                                <a
                                    href={`#${item.id}`}
                                    className={cn('transition-colors duration-300 ease-in-out', {
                                        'text-accent font-semibold':
                                            currentActiveIndex === index,
                                    })}
                                    onClick={(event) =>
                                        handleLinkClick(
                                            event,
                                            `${item.id}-section`,
                                        )
                                    }
                                >
                                    {item.title}
                                </a>
                            </motion.li>
                        );
                    })}
                </ul>
            ) : null}
        </Wrapper>
    );
};

export default TableOfContent;
