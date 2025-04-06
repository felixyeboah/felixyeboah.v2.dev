'use client';

import { cn } from '@/lib/utils';
import { Highlight, Prism } from 'prism-react-renderer';
import { useEffect } from 'react';

import CopyToClipboardButton from '../buttons/copy-to-clipboard';
import Card from '../card';
import { CodeBlockProps, HighlightedCodeTextProps } from './types';
import { calculateLinesToHighlight, hasTitle } from './utils';

(typeof global !== 'undefined' ? global : window).Prism = Prism;

export const HighlightedCodeText = (props: HighlightedCodeTextProps) => {
    const { codeString, language, highlightLine } = props;

    useEffect(() => {
        /**
         * This imports the syntax highlighting style for the Swift and GLSLlanguage
         */
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        import('prismjs/components/prism-sql');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        import('prismjs/components/prism-typescript');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        import('prismjs/components/prism-swift');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        import('prismjs/components/prism-glsl');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        import('prismjs/components/prism-javascript');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        import('prismjs/components/prism-dart');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        import('prismjs/components/prism-css');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        import('prismjs/components/prism-jsx');
    }, []);

    if (!codeString) return null;

    return (
        <Highlight
            theme={{ plain: {}, styles: [] }}
            code={codeString}
            language={language}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={cn('pre', className)} style={style}>
                    {tokens.map((line, index) => {
                        const { className: lineClassName } = getLineProps({
                            className:
                                highlightLine && highlightLine(index)
                                    ? 'highlight-line'
                                    : '',
                            key: index,
                            line,
                        });

                        return (
                            <div
                                data-testid={
                                    highlightLine && highlightLine(index)
                                        ? 'highlight-line'
                                        : 'line'
                                }
                                key={index}
                                className={cn('line', lineClassName)}
                            >
                                <div
                                    className="line-no"
                                    data-testid="number-line"
                                >
                                    {index + 1}
                                </div>
                                <span className="line-content">
                                    {line.map((token, key) => {
                                        const tokenProps = getTokenProps({
                                            token,
                                        });
                                        return (
                                            <span
                                                key={key}
                                                data-testid="content-line"
                                                {...tokenProps}
                                            />
                                        );
                                    })}
                                </span>
                            </div>
                        );
                    })}
                </pre>
            )}
        </Highlight>
    );
};

const CodeBlock = (props: CodeBlockProps) => {
    const { codeString, language, metastring } = props;

    const highlightLineFn = calculateLinesToHighlight(metastring);
    const title = hasTitle(metastring);

    return (
        <Card
            style={{
                // Fix the overflow issue when wrapped in text
                display: 'grid',
                background: 'unset',
                width: '100%',
                marginTop: '30px',
                marginBottom: '30px',

                // '@media(max-width: 750px)': {
                //     width: '100vw',
                //     position: 'relative',
                //     left: '50%',
                //     right: '50%',
                //     marginLeft: '-50vw',
                //     marginRight: '-50vw',
                // },
            }}
        >
            {title ? (
                <Card.Header
                    style={{
                        padding: '0px 16px',
                        backgroundColor: 'transparent',
                    }}
                >
                    <p
                        className="text-snippet-title"
                        data-testid="codesnippet-title"
                    >
                        {title}
                    </p>
                    <CopyToClipboardButton title={title} text={codeString} />
                </Card.Header>
            ) : null}
            <HighlightedCodeText
                codeString={codeString}
                language={language}
                highlightLine={highlightLineFn}
            />
        </Card>
    );
};

export default CodeBlock;
