import React from 'react';

interface StyledPillProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'info' | 'success' | 'warning' | 'danger';
}

export const StyledPill: React.FC<StyledPillProps> = ({
    children,
    variant,
    ...props
}) => {
    const variantClasses = {
        info: 'bg-muted text-foreground',
        success: 'bg-muted text-success',
        warning: 'bg-muted text-warning',
        danger: 'bg-muted text-danger',
    };

    return (
        <span
            className={`inline-flex items-center justify-center px-2 py-1 min-w-[40px] h-[28px] text-sm font-medium cursor-default select-none rounded-md ${(variant && variantClasses[variant]) || 'bg-muted text-foreground'}`}
            {...props}
        >
            {children}
        </span>
    );
};
