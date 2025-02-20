import React from 'react';

export const TweetWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    ...props
}) => (
    <div
        className="flex flex-col gap-5 text-text-primary rounded-lg bg-card-background p-4 w-full border border-border-color shadow-1"
        {...props}
    >
        {children}
    </div>
);

export const Avatar: React.FC<
    React.HTMLAttributes<HTMLAnchorElement> & {
        href: HTMLAnchorElement['href'];
        target: HTMLAnchorElement['target'];
    }
> = ({ children, href, ...props }) => (
    <a
        className="flex h-[46px] w-[46px] rounded-full overflow-hidden"
        href={href}
        {...props}
    >
        {children}
    </a>
);

export const Name: React.FC<
    React.HTMLAttributes<HTMLAnchorElement> & {
        href: HTMLAnchorElement['href'];
        target: HTMLAnchorElement['target'];
    }
> = ({ children, ...props }) => (
    <a className="flex flex-col ml-4 text-text-primary no-underline" {...props}>
        {children}
    </a>
);

export const ImageGrid: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    ...props
}) => (
    <div className="inline-grid grid-cols-2 gap-2" {...props}>
        {children}
    </div>
);

export const SingleImageWrapper: React.FC<
    React.HTMLAttributes<HTMLDivElement>
> = ({ children, ...props }) => <div {...props}>{children}</div>;

export const ActionIcons: React.FC<
    React.HTMLAttributes<HTMLAnchorElement> & {
        href: HTMLAnchorElement['href'];
        target: HTMLAnchorElement['target'];
    }
> = ({ children, ...props }) => (
    <a
        className="flex items-center mr-4 text-text-tertiary no-underline"
        {...props}
    >
        {children}
    </a>
);
