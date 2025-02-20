import NextImage from 'next/image';
import React from 'react';

export const Wrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    ...props
}) => (
    <div
        className="relative overflow-hidden flex rounded-lg border-4 border-border-color cursor-ew-resize transition-box-shadow duration-300 shadow-[var(--shadow,none)] focus-visible:outline-none focus-visible:shadow-[0_2px_20px_-2px_var(--input-focus)]"
        {...props}
    >
        {children}
    </div>
);

export const Image: React.FC<React.ComponentProps<typeof NextImage>> = ({
    ...props
}) => (
    <NextImage
        className="pointer-events-none select-none w-full h-auto"
        {...props}
    />
);

export const Overlay: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    ...props
}) => (
    <div
        className="absolute z-10 top-0 left-0 overflow-hidden h-full"
        style={{ clipPath: 'inset(0px 0px 0px var(--progress))' }} // Inline style for clipPath
        {...props}
    >
        {children}
    </div>
);
