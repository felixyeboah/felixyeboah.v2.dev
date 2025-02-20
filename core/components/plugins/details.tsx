import { type JSX, type ReactNode } from 'react';

const Details = ({
    children,
    title,
}: {
    title: string;
    children: ReactNode | JSX.Element;
}) => {
    return (
        <details className="-mt-0 mb-6 rounded-xl border px-6 py-10 open:pb-5 dark:border-slate-800">
            <summary className="cursor-pointer select-none font-medium p-5 text-slate-900 dark:text-slate-200">
                {title}
            </summary>
            {children}
        </details>
    );
};

Details.displayName = 'Details';

export default Details;
