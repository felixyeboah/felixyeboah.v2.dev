import { ImageLoaderProps } from 'next/legacy/image';

export const loader = ({ src }: ImageLoaderProps) => {
    return `https://res.cloudinary.com/jaeyholic/image/upload/fl_lossy,f_auto,q_auto/${src}`;
};
