'use client';

import { loader } from '@/app/libs/next-image-loader';
import * as Dialog from '@radix-ui/react-dialog';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

import { Content, Overlay, Trigger } from './lightbox';

interface ImageProps extends NextImageProps {
    border?: boolean;
    simple?: boolean;
    showAlt?: boolean;
}

const Image = (props: ImageProps) => {
    const { border = false, simple = false, showAlt = true, ...rest } = props;

    const imageSizes = [
        '(max-width: 480px) 100vw',
        '(max-width: 768px) 85vw',
        '(max-width: 1024px) 65vw',
        '(max-width: 1200px) 50vw',
        '33vw',
    ].join(', ');

    const sharedImageProps = {
        ...rest,
        loader,
        quality: 85,
        sizes: imageSizes,
        formats: ['webp', 'jpeg', 'avif'],
        blurDataURL:
            props.blurDataURL ||
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEwMT81MC4vLzAvMT47QEE6OkE7MS9JTk5JSUpJSUpKSkpKSkpKSkr/2wBDAR0XFyQeJB4cJCQcHiQeHiQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCT/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
    };

    return simple ? (
        <NextImage
            style={{
                width: '100%',
                height: 'auto',
            }}
            {...sharedImageProps}
        />
    ) : (
        <Dialog.Root>
            <figure
                className="flex flex-col items-start"
                style={{ margin: '0', width: '100%' }}
            >
                <Trigger tabIndex={0}>
                    <NextImage
                        placeholder="blur"
                        className="w-full h-auto"
                        {...sharedImageProps}
                        style={{
                            border: border
                                ? `3px solid var(--border)`
                                : 'none',
                        }}
                    />
                </Trigger>
                {showAlt ? (
                    <figcaption
                        style={{
                            lineHeight: '1.5',
                            paddingTop: '10px',
                        }}
                    >
                        {props.alt}
                    </figcaption>
                ) : null}
            </figure>
            <Dialog.Portal>
                <Overlay>
                    <Content>
                        <Dialog.Close
                            asChild
                            className="relative h-[800px] w-full"
                        >
                            <NextImage
                                // style={{
                                //     width: '100%',
                                //     height: '800px',
                                // }}
                                className="rounded-md h-full w-full object-cover"
                                loader={loader}
                                {...props}
                                quality={90}
                                sizes="100vw"
                            />
                        </Dialog.Close>
                    </Content>
                </Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Image;
