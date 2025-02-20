import { findAfter } from 'unist-util-find-after';
import { visit } from 'unist-util-visit';

const MAX_HEADING_DEPTH = 2;

function getHeadingLevel(node: { tagName: string }): number {
    return parseInt(node.tagName.charAt(1), 10);
}

function sectionize(
    node: { tagName: string; properties: { id: string } },
    parent: any,
) {
    const start = node;
    const depth = getHeadingLevel(start);

    // Get the ID that was added by rehype-slug
    const id = start.properties.id;

    const isEnd = (node: any) =>
        node.tagName?.charAt(0) === 'h' && getHeadingLevel(node) <= depth;

    const end = findAfter(parent, start, isEnd);

    const startIndex = parent.children.indexOf(start);
    const endIndex = parent.children.indexOf(end);

    const between = parent.children.slice(
        startIndex,
        endIndex > 0 ? endIndex : undefined,
    );

    const section = {
        type: 'element',
        tagName: 'section',
        properties: {
            id: `${id}-section`,
        },
        children: between,
    };

    parent.children.splice(startIndex, section.children.length, section);
}

function transform(tree: any) {
    for (let depth = MAX_HEADING_DEPTH; depth > 0; depth--) {
        visit(
            tree,
            (node: any) => node.tagName === `h${depth}`,
            (node, index, parent) => sectionize(node, parent),
        );
    }
}

export const rehypeSectionize = () => {
    return transform;
};
