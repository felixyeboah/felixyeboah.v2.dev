import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { ChangeEventHandler } from 'react';
import { cn } from '@/lib/utils';

export const Tag = ({
    tag,
    onClick,
    disabled,
    selected,
}: {
    tag: string;
    selected: boolean;
    onClick?: ChangeEventHandler<HTMLInputElement>;
    disabled?: boolean;
}) => {
    return (
        <motion.button
            onClick={
                disabled
                    ? undefined
                    : (onClick as unknown as React.MouseEventHandler<HTMLButtonElement>)
            }
            layout
            initial={false}
            animate={{
                opacity: disabled ? 0.75 : 1,
            }}
            className={cn(
                'inline-flex items-center px-4 py-2 rounded-full text-base font-medium font-sans',
                'whitespace-nowrap overflow-hidden ring-1 ring-inset ring-border',
                'transition-colors duration-100',
                selected
                    ? 'bg-card text-card-foreground hover:bg-muted'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                disabled ? 'cursor-not-allowed text-muted-foreground/50' : 'cursor-pointer',
            )}
            transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 0.5,
            }}
        >
            <motion.div
                className="relative flex items-center"
                animate={{
                    width: selected ? 'auto' : '100%',
                    paddingRight: selected ? '1.5rem' : '0',
                }}
                transition={{
                    ease: [0.175, 0.885, 0.32, 1.275],
                    duration: 0.3,
                }}
            >
                <span>{tag}</span>
                <AnimatePresence>
                    {selected && (
                        <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                                type: 'spring',
                                stiffness: 500,
                                damping: 30,
                                mass: 0.5,
                            }}
                            className="absolute right-0"
                        >
                            <div className="w-4 h-4 rounded-full bg-card flex items-center justify-center ring-2 ring-background">
                                <Check
                                    className="w-3 h-3 text-card-foreground"
                                    strokeWidth={1.5}
                                />
                            </div>
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.button>
    );
};
