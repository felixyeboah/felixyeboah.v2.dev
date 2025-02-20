'use client';

import * as Dialog from '@radix-ui/react-dialog';

export const Overlay: React.FC<React.ComponentProps<typeof Dialog.Overlay>> = ({
    children,
    ...props
}) => (
    <Dialog.Overlay
        className="fixed inset-0 p-8 z-[100] grid place-items-center overflow-y-auto backdrop-blur-lg cursor-zoom-out data-[state=open]:animate-overlay-show data-[state=closed]:animate-overlay-hide"
        {...props}
    >
        {children}
    </Dialog.Overlay>
);

export const Content: React.FC<React.ComponentProps<typeof Dialog.Content>> = ({
    children,
    ...props
}) => (
    <Dialog.Content
        className="max-w-[1400px] w-[95vw] bg-transparent z-[100] data-[state=open]:animate-content-show data-[state=closed]:animate-content-hide focus:outline-none"
        {...props}
    >
        {children}
    </Dialog.Content>
);

export const Trigger: React.FC<React.ComponentProps<typeof Dialog.Trigger>> = ({
    children,
    ...props
}) => (
    <Dialog.Trigger className="all-unset cursor-zoom-in w-full" {...props}>
        {children}
    </Dialog.Trigger>
);
