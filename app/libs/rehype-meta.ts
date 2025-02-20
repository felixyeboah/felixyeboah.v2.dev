import { Node } from 'unist';
import { visit } from 'unist-util-visit';

interface CodeNode extends Node {
    tagName?: string;
    data?: {
        meta?: string;
    };
    properties: {
        metastring?: string;
    };
}

const transform = (tree: Node) => {
    visit(tree, 'element', (node: CodeNode) => {
        if (node.tagName === 'code' && node.data && node.data.meta) {
            node.properties.metastring = node.data.meta;
        }
    });
};

export const rehypeMeta = () => {
    return transform;
};
