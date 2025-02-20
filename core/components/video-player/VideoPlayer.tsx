'use client';

import React from 'react';

interface VideoPlayerProps {
    autoPlay?: boolean;
    poster?: string;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    width?: number;
    height?: number;
    src: string;
}

const getDisplayedPoster = (poster: string) => {
    return `/static/posters/${poster}_dark.png`;
};

const VideoPlayer = (props: VideoPlayerProps) => {
    const { autoPlay, controls, loop, muted, width, height, poster, src } =
        props;
    const [currentPoster, setCurrentPoster] = React.useState<
        string | undefined
    >(undefined);

    React.useEffect(() => {
        if (poster) {
            if (!poster.includes('.png') && !poster.includes('https')) {
                setCurrentPoster(getDisplayedPoster(poster));
            } else {
                setCurrentPoster(poster);
            }
        }
    }, [poster]);

    return (
        <video
            className="mx-auto bg-emphasis rounded-xl border-4 border-border max-w-full h-auto"
            autoPlay={autoPlay}
            poster={currentPoster}
            width={width}
            height={height}
            controls={controls}
            loop={loop || false}
            muted={muted}
            playsInline
        >
            <source src={src} type="video/mp4" />
        </video>
    );
};

export { VideoPlayer };
