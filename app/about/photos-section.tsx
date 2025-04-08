'use client';

import { loader } from '@/app/libs/next-image-loader';
import { Button } from '@/core/components/ui/button';
import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const images = [
    {
        title: 'Larabanga Mosque in the Northern Region',
        img: 'photos/Squoosh_0447e197685e856892e90a2a5c3713d6a1aa3efc_3900x2600_a6g7wd',
    },
    {
        title: "Saint Juame's Church, Spain",
        img: 'photos/IMG_1890_v0biqn',
    },
    {
        title: 'An Elephant in the Mole National Park',
        img: 'photos/Squoosh_Image_3900x2600_mo311y',
    },
    {
        title: 'A view of Mount Adaklu in the Volta Region of Ghana',
        img: 'photos/Squoosh_3900x2600_dcwnr7',
    },
    {
        title: 'Kente weaving in Ho, Volta Region of Ghana',
        img: 'photos/Squoosh_792219a3a9b23587991f13a9a8ce6911039c1340_3900x2600_rkcygj',
    },
];

export const PhotosSection = () => {
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [activeTitle, setActiveTitle] = useState('');
    const followerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        requestAnimationFrame(() => {
            const { clientX, clientY } = e;
            setMousePosition({
                x: clientX,
                y: clientY,
            });
        });
    };

    const handleImageHover = (hoveredIndex: number) => {
        setIsHovering(true);
        setActiveTitle(images[hoveredIndex].title);

        imageRefs.current.forEach((ref, index) => {
            if (!ref) return;

            gsap.to(ref, {
                width: index === hoveredIndex ? '70%' : '15%',
                duration: 0.6,
                ease: 'power3.inOut',
            });
        });
    };

    const handleImageLeave = () => {
        setIsHovering(false);
        setActiveTitle('');

        imageRefs.current.forEach((ref, index) => {
            if (!ref) return;

            gsap.to(ref, {
                width: index === 2 ? '70%' : '15%',
                duration: 0.6,
                ease: 'power3.inOut',
            });
        });
    };

    useEffect(() => {
        const cursor = followerRef.current;
        if (!cursor) return;

        gsap.to(cursor, {
            x: mousePosition.x,
            y: mousePosition.y,
            duration: 0.1,
            ease: 'none',
        });
    }, [mousePosition]);

    return (
        <div className="min-h-screen space-y-6 sm:space-y-8 lg:space-y-12 py-8 sm:py-12 lg:py-16" onMouseMove={handleMouseMove}>
            <div ref={followerRef} className={`fixed top-0 left-0 pointer-events-none z-[999] flex items-center justify-center px-4 h-10 rounded-md bg-black/80 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`} style={{ transform: 'translate(-50%, -50%)' }}>
                <p className="text-sm text-center text-white font-medium whitespace-nowrap">
                    {activeTitle}
                </p>
            </div>
            <div className="space-y-6 sm:space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-white gap-4 sm:gap-0">
                    <h3 className="text-lg sm:text-xl uppercase">Photos</h3>
                    <Button
                        className="text-base sm:text-lg font-normal px-0 underlined hover:bg-transparent hover:text-white/90 cursor-pointer"
                        variant="ghost"
                    >
                        View all photos
                    </Button>
                </div>
                <div className="hidden sm:flex items-center gap-2" onMouseMove={handleMouseMove}>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                imageRefs.current[index] = el;
                            }}
                            className="relative h-[50vh] sm:h-[60vh] lg:h-[75vh] transition-none cursor-none overflow-hidden"
                            style={{
                                width: index === 2 ? '70%' : '15%',
                            }}
                            onMouseEnter={() => handleImageHover(index)}
                            onMouseLeave={handleImageLeave}
                        >
                            <Image
                                src={image.img}
                                alt={image.title}
                                loader={loader}
                                fill
                                className="w-full h-full object-cover pointer-events-none"
                            />
                        </div>
                    ))}
                </div>
                <div className="flex sm:hidden flex-col gap-4">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative h-[300px] w-full overflow-hidden rounded-lg"
                        >
                            <Image
                                src={image.img}
                                alt={image.title}
                                loader={loader}
                                fill
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-sm text-white">{image.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <p className="text-base sm:text-lg lg:text-xl w-full lg:w-2/5 text-gray-300">
                In my free time, I love exploring new places through travel,
                capturing moments with my camera, and going on hikes. I also
                enjoy fun activities and learning more about the world around
                me. I hope you like my photos as much as I enjoy taking them!
            </p>
        </div>
    );
};
