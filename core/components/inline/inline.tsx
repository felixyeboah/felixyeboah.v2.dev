import { StyledInlineCode } from './style';
import { InlineCodeProps } from './types';

const InlineCode = (props: InlineCodeProps) => {
    return <StyledInlineCode>{props.children}</StyledInlineCode>;
};

export default InlineCode;
