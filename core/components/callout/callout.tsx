import { CalloutProps } from './types';
import { getVariantIcon } from './utils';

const Callout = (props: CalloutProps) => {
    const { children, label, variant, ...rest } = props;

    const icon = label ? null : getVariantIcon(variant);

    return (
        <aside className="callout" data-variant={variant} {...rest}>
            {icon ? (
                <div className="callout-icon-wrapper" data-variant={variant}>
                    {icon}
                </div>
            ) : null}
            {label ? (
                <div className="callout-label-wrapper" data-variant={variant}>
                    {label}
                </div>
            ) : null}
            {children}
        </aside>
    );
};

export default Callout;
