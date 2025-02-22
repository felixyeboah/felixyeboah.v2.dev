'use client';

import { useEffect, useRef } from 'react';

import { BlockquoteProps } from './types';

const Blockquote = (props: BlockquoteProps) => {
    const { children, ...rest } = props;

    const ref = useRef<HTMLQuoteElement>(null);

    const handleResize = () => {
        if (ref.current) {
            const vw = document.documentElement.clientWidth / 100;
            ref.current.style.setProperty('--vw', `${vw}px`);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <blockquote className="blockquote-wrapper" ref={ref} {...rest}>
            <div className="blockquote-content">{children}</div>
        </blockquote>
    );
};

export default Blockquote;
