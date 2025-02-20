import React from 'react';

interface StyledPillProps extends React.HTMLAttributes<HTMLSpanElement> {
    dark?: boolean;
    variant?: 'info' | 'success' | 'warning' | 'danger';
}

export const StyledPill: React.FC<StyledPillProps> = ({
    children,
    dark = false,
    variant,
    ...props
}) => {
    const variantClasses = {
        info: 'bg-emphasis text-accent',
        success: 'bg-success-emphasis text-success',
        warning: 'bg-warning-emphasis text-warning',
        danger: 'bg-danger-emphasis text-danger',
    };

    return (
        <span
            className={`inline-flex items-center justify-center px-2 py-1 min-w-[40px] h-[28px] text-sm font-medium cursor-default select-none rounded-md ${(variant && variantClasses[variant]) || ''} ${dark ? '' : ''}`}
            {...props}
        >
            {children}
        </span>
    );
};
