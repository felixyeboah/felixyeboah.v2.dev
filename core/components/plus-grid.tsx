import { clsx } from "clsx"

export function PlusGrid({ className = "", children }: { className?: string; children: React.ReactNode }) {
    return <div className={className}>{children}</div>
}

export function PlusGridRow({ className = "", children }: { className?: string; children: React.ReactNode }) {
    return (
        <div
            className={clsx(
                className,
                "group/row relative isolate pt-[calc(theme(spacing.2)+1px)] last:pb-[calc(theme(spacing.2)+1px)]",
            )}
        >
            <div aria-hidden="true" className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2">
                {/* Horizontal lines */}
                <div className="absolute inset-x-0 top-0 border-t border-black/15 dark:border-white/10 dark:shadow-[0_0_15px_rgba(96,165,250,0.2)] animate-glow-slow-1">
                    <div className="absolute h-px w-64 bg-gradient-to-r from-blue-500/0 via-blue-500/70 to-blue-500/0 dark:from-indigo-500/0 dark:via-blue-400/70 dark:to-purple-500/0 animate-trace-slow-1" />
                </div>
                <div className="absolute inset-x-0 top-2 border-t border-black/15 dark:border-white/10 dark:shadow-[0_0_15px_rgba(96,165,250,0.2)] animate-glow-slow-2">
                    <div className="absolute h-px w-64 bg-gradient-to-r from-blue-500/0 via-blue-500/70 to-blue-500/0 dark:from-purple-500/0 dark:via-blue-400/70 dark:to-indigo-500/0 animate-trace-slow-2" />
                </div>
                <div className="absolute inset-x-0 bottom-0 hidden border-b border-black/15 dark:border-white/10 dark:shadow-[0_0_15px_rgba(96,165,250,0.2)] animate-glow-slow-1 group-last/row:block">
                    <div className="absolute h-px w-64 bg-gradient-to-r from-blue-500/0 via-blue-500/70 to-blue-500/0 dark:from-indigo-500/0 dark:via-blue-400/70 dark:to-purple-500/0 animate-trace-slow-3" />
                </div>
                <div className="absolute inset-x-0 bottom-2 hidden border-b border-black/15 dark:border-white/10 dark:shadow-[0_0_15px_rgba(96,165,250,0.2)] animate-glow-slow-2 group-last/row:block">
                    <div className="absolute h-px w-64 bg-gradient-to-r from-blue-500/0 via-blue-500/70 to-blue-500/0 dark:from-purple-500/0 dark:via-blue-400/70 dark:to-indigo-500/0 animate-trace-slow-4" />
                </div>

                {/* Vertical lines */}
                <div className="absolute left-[8%] top-0 h-full border-l border-black/15 dark:border-white/10 dark:shadow-[0_0_15px_rgba(96,165,250,0.2)] animate-glow-slow-1">
                    <div className="absolute w-px h-full bg-gradient-to-b from-blue-500/0 via-blue-500/70 to-blue-500/0 dark:from-indigo-500/0 dark:via-blue-400/70 dark:to-purple-500/0 animate-trace-vertical-1" />
                </div>
                <div className="absolute left-[33%] top-0 h-full border-l border-black/15 dark:border-white/10 dark:shadow-[0_0_15px_rgba(96,165,250,0.2)] animate-glow-slow-2">
                    <div className="absolute w-px h-full bg-gradient-to-b from-blue-500/0 via-blue-500/70 to-blue-500/0 dark:from-purple-500/0 dark:via-blue-400/70 dark:to-indigo-500/0 animate-trace-vertical-2" />
                </div>
                <div className="absolute right-[12.9%] top-0 h-full border-r border-black/15 dark:border-white/10 dark:shadow-[0_0_15px_rgba(96,165,250,0.2)] animate-glow-slow-1">
                    <div className="absolute w-px h-full bg-gradient-to-b from-blue-500/0 via-blue-500/70 to-blue-500/0 dark:from-indigo-500/0 dark:via-blue-400/70 dark:to-purple-500/0 animate-trace-vertical-1" />
                </div>
            </div>
            {children}
        </div>
    )
}

export function PlusGridItem({ className = "", children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={clsx(className, "group/item relative")}>
            <PlusGridIcon placement="top left" className="hidden group-first/item:block" />
            <PlusGridIcon placement="top right" />
            <PlusGridIcon placement="bottom left" className="hidden group-last/row:group-first/item:block" />
            <PlusGridIcon placement="bottom right" className="hidden group-last/row:block" />
            {children}
        </div>
    )
}

export function PlusGridIcon({
    className = "",
    placement,
}: {
    className?: string
    placement: `${"top" | "bottom"} ${"right" | "left"}`
}) {
    const [yAxis, xAxis] = placement.split(" ")

    const yClass = yAxis === "top" ? "-top-2" : "-bottom-2"
    const xClass = xAxis === "left" ? "-left-2" : "-right-2"

    return (
        <svg
            viewBox="0 0 15 15"
            aria-hidden="true"
            className={clsx(className, "absolute size-[15px] fill-black/10 dark:fill-white/10", yClass, xClass)}
        >
            <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z" />
        </svg>
    )
}
