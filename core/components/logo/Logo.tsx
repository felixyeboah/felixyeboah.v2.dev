import { cn } from '@/lib/utils';
import React from 'react';

const Logo = ({ className }: { className?: string }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--color-gray-700)',
            fontWeight: 'bold',
            textTransform: 'uppercase',
        }}
        className={cn('transition-[0.5s] will-change-[stroke,fill]', className)}
    >
        <div>
            <span
                style={{
                    fontSize: '1.875rem',
                    lineHeight: '2.25rem',
                }}
            >
                ✦
            </span>
        </div>
        <div>
            <h4
                style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                }}
            >
                The
            </h4>
            <h4>Felix</h4>
        </div>
    </div>
);

export default Logo;
