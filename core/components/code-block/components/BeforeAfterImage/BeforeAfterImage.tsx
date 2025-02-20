'use client';

import { loader } from '@/app/libs/next-image-loader';
import Icon from '@/core/components/icon';
import { animate, useMotionValue } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import * as S from './BeforeAfterImage.styles';
import { BeforeAfterImageProps } from './types';

const Slider = () => (
    <div
        className="flex items-center absolute pointer-events-none inset-y-0 -translate-x-1/2 z-[1]"
        style={{
            left: 'var(--progress)',
        }}
        id="slider-line"
    >
        <div className="absolute left-1/2 inset-y-0 w-[3px] -translate-x-1/2 bg-[var(--foreground)]" />
        <div className="flex items-center w-12 h-12 bg-[var(--foreground)] backdrop-blur-md z-[2] rounded-[var(--border-radius-2)] border-[3px] border-[var(--border-color)]">
            <Icon.Arrow
                size="4"
                style={{ transform: 'rotate(180deg)' }}
                variant="tertiary"
            />
            <Icon.Arrow size="4" variant="tertiary" />
        </div>
    </div>
);

const BeforeAfterImage = (props: BeforeAfterImageProps) => {
    const { alt, defaultSliderPosition, beforeSrc, afterSrc, width, height } =
        props;
    const [sliderPosition, setSliderPosition] = useState(
        defaultSliderPosition || 50,
    );
    const [isDragging, setIsDragging] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const wiggleMotion = useMotionValue(sliderPosition);
    let hoverTimer = null as NodeJS.Timer | null;

    const calculateSliderPosition = (clientX: number) => {
        if (hoverTimer) clearTimeout(hoverTimer as NodeJS.Timeout);
        const rect = wrapperRef.current!.getBoundingClientRect();
        const x = clientX - rect.left;
        const sliderPositionPercentage = (x / rect.width) * 100;
        setSliderPosition(Math.min(Math.max(sliderPositionPercentage, 0), 100));
        wiggleMotion.set(sliderPositionPercentage);
    };

    const initiateWiggle = useCallback(() => {
        animate(
            wiggleMotion,
            [
                sliderPosition,
                sliderPosition - 1.5,
                sliderPosition + 1.5,
                sliderPosition - 1.5,
                sliderPosition + 1.5,
                sliderPosition,
            ],
            {
                type: 'spring',
            },
        );
    }, [sliderPosition, wiggleMotion]);

    const handleMouseDown = (event: React.MouseEvent) => {
        if (hoverTimer) clearTimeout(hoverTimer as NodeJS.Timeout);
        setIsDragging(true);
        calculateSliderPosition(event.clientX);
    };

    const handleTouchMove = (event: React.TouchEvent) => {
        if (event.touches.length === 1) {
            calculateSliderPosition(event.touches[0].clientX);
        }
    };

    const handleMouseUp = () => {
        if (hoverTimer) clearTimeout(hoverTimer as NodeJS.Timeout);
        setIsDragging(false);
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!isDragging) return;
        if (hoverTimer) clearTimeout(hoverTimer as NodeJS.Timeout);
        calculateSliderPosition(event.clientX);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (hoverTimer) {
            clearTimeout(hoverTimer as NodeJS.Timeout);
        }
        switch (event.key) {
            case 'ArrowLeft':
                wiggleMotion.set(Math.max(0, sliderPosition - 5));
                break;
            case 'ArrowRight':
                wiggleMotion.set(Math.max(0, sliderPosition + 5));
                break;
            default:
                break;
        }
    };

    const handleMouseEnter = () => {
        hoverTimer = setTimeout(initiateWiggle, 1200);
    };

    const handleMouseLeave = () => {
        if (hoverTimer) clearTimeout(hoverTimer as NodeJS.Timeout);
        handleMouseUp();
    };

    useEffect(() => {
        const unsubscribe = wiggleMotion.onChange((value) => {
            if (value < 0) return;
            if (value > 100) return;
            setSliderPosition(value);
        });

        return () => {
            if (hoverTimer) clearTimeout(hoverTimer as NodeJS.Timeout);
            unsubscribe();
        };
    }, [hoverTimer, wiggleMotion]);

    return (
        <figure className="flex items-start flex-col gap-1">
            <S.Wrapper
                ref={wrapperRef}
                tabIndex={0}
                role="slider"
                aria-label={alt}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={sliderPosition}
                onKeyDown={handleKeyDown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                style={{
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-expect-error
                    '--progress': `${wiggleMotion.get()}%`,
                }}
            >
                <S.Image
                    alt="Before"
                    loading="eager"
                    loader={loader}
                    src={beforeSrc}
                    quality={75}
                    width={width}
                    height={height}
                />
                <S.Overlay>
                    <S.Image
                        alt="After"
                        loading="eager"
                        loader={loader}
                        quality={75}
                        src={afterSrc}
                        width={width}
                        height={height}
                    />
                </S.Overlay>
                <Slider />
            </S.Wrapper>
            <figcaption
                style={{
                    lineHeight: '1.5',
                    paddingTop: '10px',
                }}
            >
                {props.alt}
            </figcaption>
        </figure>
    );
};

export default BeforeAfterImage;
