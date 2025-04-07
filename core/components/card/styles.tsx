'use client';

import React from 'react';

export const CardWrapper: React.FC<
    React.HTMLAttributes<HTMLDivElement> & {
        glass?: boolean;
        depth?: 0 | 1 | 2 | 3;
    }
> = ({ children, glass, depth = 1, ...props }) => {
    const depthClasses = {
        0: 'shadow-0',
        1: 'shadow-1',
        2: 'shadow-2',
        3: 'shadow-3',
    };

    return (
        <div
            className={`relative bg-background backdrop-blur-[6px] rounded-lg border border-border overflow-hidden ${glass ? 'bg-foreground backdrop-blur-lg' : ''} ${depthClasses[depth] || depthClasses[1]}`}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    ...props
}) => (
    <div
        className="flex justify-between items-center rounded-t-lg min-h-8 px-6 text-muted-foreground font-medium text-sm border-b border-border"
        {...props}
    >
        {children}
    </div>
);

CardHeader.displayName = 'CardHeader';

export const CardBody: React.FC<
    React.HTMLAttributes<HTMLDivElement> & { dotMatrix?: boolean }
> = ({ children, dotMatrix, ...props }) => (
    <div
        className={`overflow-hidden px-6 py-6 relative ${dotMatrix ? 'bg-[radial-gradient(var(--color-border)_1px,transparent_0)] bg-center bg-[length:20px_20px]' : ''}`}
        {...props}
    >
        {children}
    </div>
);
