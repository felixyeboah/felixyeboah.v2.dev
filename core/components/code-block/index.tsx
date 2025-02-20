import dynamic from 'next/dynamic';
import React from 'react';

import { PrePropsType } from './types';
import { preToCodeBlock } from './utils';

const CodeBlock = dynamic(() => import('./code-block'));

const Code = (preProps: PrePropsType) => {
    const props = preToCodeBlock(preProps);

    if (props) {
        return <CodeBlock {...props} />;
    }

    return null;
};

export default Code;
