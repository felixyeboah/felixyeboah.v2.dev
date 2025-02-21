import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { ChangeEventHandler } from 'react';

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
                backgroundColor: selected
                    ? 'oklch(0.13 0.028 261.692)'
                    : 'oklch(0.278 0.033 256.848)',
                opacity: disabled ? 0.5 : 1,
            }}
            whileHover={{
                backgroundColor: disabled
                    ? undefined
                    : selected
                      ? 'oklch(0.13 0.028 261.692)'
                      : 'oklch(0.278 0.033 256.848)',
            }}
            whileTap={{
                backgroundColor: disabled
                    ? undefined
                    : selected
                      ? 'oklch(0.13 0.028 261.692)'
                      : 'oklch(0.278 0.033 256.848)',
            }}
            className={`
                inline-flex items-center px-4 py-2 rounded-full text-base font-medium font-sans
                whitespace-nowrap overflow-hidden ring-1 ring-inset
                ${selected ? 'text-primary ring-gray-950' : 'text-zinc-300 ring-gray-950'}
                ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
            transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 0.5,
                backgroundColor: { duration: 0.1 },
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
                            <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                                <Check
                                    className="w-3 h-3 text-zinc-300"
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
