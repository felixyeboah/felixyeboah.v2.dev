import { Separator } from '@/components/ui/separator';

import ArrowIcon from './ArrowIcon';
import Blockquote from './blockquote';
import Callout from './callout';
import Card from './card';
import Code from './code-block';
import Image from './image';
import InlineCode from './inline/inline';
import Pill from './pill';
import { Details, Info, Summary, Warn } from './plugins';
import VideoPlayer from './video-player';

const customComponents = {
    Card,
    CardBody: Card.Body,
};

const MDXComponents = {
    ArrowIcon,
    Image,
    Details,
    Info,
    Warn,
    Summary,
    Pill,
    Callout,
    Separator,
    a: function A(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
        return (
            <a className="underline" {...props}>
                {props.children}
            </a>
        );
    },
    blockquote: Blockquote,
    em: function Emphasis(props: React.HTMLAttributes<HTMLElement>) {
        return <em {...props}>{props.children}</em>;
    },
    h2: function Heading2(props: React.HTMLAttributes<HTMLHeadingElement>) {
        return <h2 {...props}>{props.children}</h2>;
    },
    h3: function Heading3(props: React.HTMLAttributes<HTMLHeadingElement>) {
        return <h3 {...props}>{props.children}</h3>;
    },
    code: InlineCode,
    li: function ListItem(props: React.HTMLAttributes<HTMLLIElement>) {
        return <li {...props}>{props.children}</li>;
    },
    ol: function OL(props: React.OlHTMLAttributes<HTMLOListElement>) {
        return <ol {...props} />;
    },
    p: function P(props: React.HTMLAttributes<HTMLParagraphElement>) {
        return <span {...props}>{props.children}</span>;
    },
    pre: Code,
    strong: function StrongText(props: React.HTMLAttributes<HTMLElement>) {
        return (
            <strong {...props} className="bg-blue-600">
                {props.children}
            </strong>
        );
    },
    ul: function UL(props: React.HTMLAttributes<HTMLUListElement>) {
        return <ul {...props} />;
    },
    VideoPlayer,
    ...customComponents,
};

export default MDXComponents;
