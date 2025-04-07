import { cn } from '@/lib/utils';

interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

export function StyledInlineCode({
    children,
    className,
    ...props
}: InlineCodeProps) {
    return (
        <code
            className={cn(
                'font-mono leading-[1.45rem] rounded-[8px] bg-muted text-foreground px-1.5 py-0.5 text-[14px] !font-normal break-words border border-border [-webkit-box-decoration:clone]',
                className,
            )}
            {...props}
        >
            {children}
        </code>
    );
}
