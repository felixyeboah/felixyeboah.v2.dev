import React from 'react';

import {
    CustomClearConsoleButton,
    CustomGoToCodesandboxButton,
    CustomRefreshButton,
    CustomRunButton,
} from '../CustomSandpackButtons';
import { PreviewTabsProps } from './types';

const PreviewTabs = (props: PreviewTabsProps) => {
    const { selectedTab, onTabSelect, onClear } = props;

    return (
        <div
            className="flex gap-2 justify-between"
            style={{
                padding: '0 var(--space-2)',
                height: 40,
                width: '100%',
                borderBottom: '1px solid var(--border-color)',
            }}
        >
            <div className="flex gap-2">
                <button
                    role="tab"
                    aria-selected={selectedTab === 'preview'}
                    className="bg-transparent cursor-pointer border-none hover:text-accent"
                    onClick={() => onTabSelect('preview')}
                >
                    <p className="transition-colors duration-150">Preview</p>
                </button>
                <button
                    role="tab"
                    aria-selected={selectedTab === 'console'}
                    className="bg-transparent cursor-pointer border-none hover:text-accent"
                    onClick={() => onTabSelect('console')}
                >
                    <p className="transition-colors duration-150">Console</p>
                </button>
            </div>
            <div className="flex">
                <CustomGoToCodesandboxButton />
                <CustomRunButton />
                <CustomRefreshButton />
                <CustomClearConsoleButton
                    // Workaround to make console clear work
                    onClear={onClear}
                />
            </div>
        </div>
    );
};

export default PreviewTabs;
