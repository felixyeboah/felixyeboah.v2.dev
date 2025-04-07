'use client';

import { motion, useReducedMotion } from 'framer-motion';
import React, { useState } from 'react';

export const ProgressBarWrapper: React.FC<
    React.ComponentProps<typeof motion.div>
> = ({ ...props }) => (
    <motion.div
        className="h-[calc(88vh-0px)] max-h-[425px] w-px bg-primary hidden md:block"
        {...props}
    />
);

const ProgressBar = ({ progress }: { progress: number }) => {
    const [visibility, setVisibility] = useState(true);
    const shouldReduceMotion = useReducedMotion();

    const progressBarWrapperVariants = {
        hide: {
            opacity: shouldReduceMotion ? 1 : 0,
        },
        show: (visibility: boolean) => ({
            opacity: shouldReduceMotion ? 1 : visibility ? 0.7 : 0,
        }),
    };

    React.useEffect(
        () => setVisibility(progress >= 0.07 && progress <= 0.95),
        [progress],
    );

    return (
        <ProgressBarWrapper
            initial="hide"
            variants={progressBarWrapperVariants}
            animate="show"
            transition={{ type: 'spring' }}
            custom={visibility}
        >
            <motion.div
                className="w-[2px] h-full bg-secondary"
                style={{
                    transformOrigin: 'top',
                    scaleY: progress,
                }}
                data-testid="progress-bar"
                data-testprogress={progress}
            />
        </ProgressBarWrapper>
    );
};

export default ProgressBar;
