import { cn } from '@/lib/utils';
import { SVGProps } from 'react';

export type IconSize =
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15';
export type IconVariant =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'info'
    | 'danger'
    | 'success'
    | 'warning';

interface IconProps extends SVGProps<SVGSVGElement> {
    size?: IconSize;
    variant?: IconVariant;
    outline?: boolean;
}

const variantClasses: Record<IconVariant, string> = {
    default: 'stroke-current fill-none',
    primary: 'stroke-[var(--text-primary)] fill-none',
    secondary: 'stroke-[var(--text-secondary)] fill-none',
    tertiary: 'stroke-[var(--text-tertiary)] fill-none',
    info: 'stroke-[var(--accent)] fill-[var(--emphasis)]',
    danger: 'stroke-[var(--danger)] fill-[var(--danger-emphasis)]',
    success: 'stroke-[var(--success)] fill-[var(--success-emphasis)]',
    warning: 'stroke-[var(--warning)] fill-[var(--warning-emphasis)]',
};

const sizeClasses: Record<IconSize, string> = {
    '1': 'w-[var(--space-1)] h-[var(--space-1)]',
    '2': 'w-[var(--space-2)] h-[var(--space-2)]',
    '3': 'w-[var(--space-3)] h-[var(--space-3)]',
    '4': 'w-[var(--space-4)] h-[var(--space-4)]',
    '5': 'w-[var(--space-5)] h-[var(--space-5)]',
    '6': 'w-[var(--space-6)] h-[var(--space-6)]',
    '7': 'w-[var(--space-7)] h-[var(--space-7)]',
    '8': 'w-[var(--space-8)] h-[var(--space-8)]',
    '9': 'w-[var(--space-9)] h-[var(--space-9)]',
    '10': 'w-[var(--space-10)] h-[var(--space-10)]',
    '11': 'w-[var(--space-11)] h-[var(--space-11)]',
    '12': 'w-[var(--space-12)] h-[var(--space-12)]',
    '13': 'w-[var(--space-13)] h-[var(--space-13)]',
    '14': 'w-[var(--space-14)] h-[var(--space-14)]',
    '15': 'w-[var(--space-15)] h-[var(--space-15)]',
};

export const StyledSVG = ({
    size = '5',
    variant = 'default',
    outline = true,
    className,
    ...props
}: IconProps) => {
    return (
        <svg
            className={cn(
                sizeClasses[size],
                variantClasses[variant],
                outline && '!fill-none',
                className,
            )}
            {...props}
        />
    );
};

export type { IconProps };
