'use client';

import {
    SandpackCodeEditor,
    SandpackConsole,
    SandpackLayout,
    SandpackPredefinedTemplate,
    SandpackPreview,
    SandpackProvider,
} from '@codesandbox/sandpack-react';
import React, { useState } from 'react';

import PreviewTabs, { Tab } from './components/PreviewTabs';
import setupFiles from './sandpack-setup-files';

// Default Theme
const theme = {
    colors: {
        hover: 'var(--accent)',
        clickable: 'var(--text-secondary)',
        accent: 'var(--accent)',
        errorSurface: 'var(--danger-emphasis)',
        error: 'var(--danger)',
        surface3: 'var(--emphasis)',
        surface2: 'var(--border-color)',
        surface1: 'var(--secondary)',
    },
    syntax: {
        plain: 'var(--comment)',
        comment: {
            color: 'var(--comment)',
        },
        keyword: 'var(--keyword)',
        tag: 'var(--symbol)',
        punctuation: 'var(--punctuation)',
        definition: 'var(--function)',
        property: 'var(--function)',
        static: 'var(--comment)',
        string: 'var(--selector)',
    },
    font: {
        body: 'var(--font-display)',
        mono: 'var(--font-mono)',
        size: '14px',
        lineHeight: '26px',
    },
};

const defaultEditorOptions = {
    showNavigator: false,
    showInlineErrors: true,
    showLineNumbers: true,
    editorHeight: 520,
};

// Styles
export const SandpackWrapper: React.FC<
    React.HTMLAttributes<HTMLDivElement>
> = ({ children, ...props }) => <div {...props}>{children}</div>;

// TODO extends from sandpack type
interface SandpackOptions {
    editorWidthPercentage: number;
    editorHeight: number;
}

interface SandpackProps {
    template: SandpackPredefinedTemplate;
    options?: SandpackOptions;
    // Type using Sandpack built in types
    files: Record<string, any>;
    dependencies?: Record<string, string>;
    autorun?: boolean;
    defaultTab?: Tab;
}

const defaultFilesByTemplate: Record<SandpackPredefinedTemplate, any> = {
    react: setupFiles,
    // TODO
    astro: '',
    'react-ts': '',
    vanilla: '',
    'vanilla-ts': '',
    angular: '',
    vue: '',
    'vue-ts': '',
    svelte: '',
    solid: '',
    'test-ts': '',
    static: '',
    node: '',
    nextjs: '',
    vite: '',
    'vite-react': '',
    'vite-react-ts': '',
    'vite-preact': '',
    'vite-preact-ts': '',
    'vite-vue': '',
    'vite-vue-ts': '',
    'vite-svelte': '',
    'vite-svelte-ts': '',
};

const Sandpack = (props: SandpackProps) => {
    const {
        files,
        dependencies,
        template,
        autorun = true,
        defaultTab = 'preview',
    } = props;

    const [consoleKey, setConsoleKey] = useState(0);
    const [selectedTab, setSelectedTab] = useState<Tab>(defaultTab);

    return (
        <SandpackWrapper>
            <SandpackProvider
                template={template}
                theme={theme}
                files={{
                    ...files,
                    ...defaultFilesByTemplate[template],
                }}
                customSetup={{
                    dependencies: dependencies || {},
                }}
                options={{
                    autorun,
                }}
            >
                <SandpackLayout>
                    <div
                        className="flex flex-col justify-between w-1/2 md:w-full"
                        style={{
                            height: defaultEditorOptions.editorHeight,
                            gap: 0,
                        }}
                    >
                        <PreviewTabs
                            onClear={() => setConsoleKey(consoleKey + 1)}
                            onTabSelect={(tab) => setSelectedTab(tab)}
                            selectedTab={selectedTab}
                        />
                        <SandpackConsole
                            key={consoleKey}
                            showHeader
                            style={{
                                height: defaultEditorOptions.editorHeight - 40,
                                display:
                                    selectedTab === 'console' ? 'flex' : 'none',
                            }}
                        />
                        <SandpackPreview
                            showNavigator={defaultEditorOptions.showNavigator}
                            showRefreshButton={false}
                            showOpenInCodeSandbox={false}
                            style={{
                                height: defaultEditorOptions.editorHeight - 40,
                                display:
                                    selectedTab === 'preview' ? 'flex' : 'none',
                            }}
                        />
                    </div>
                    <SandpackCodeEditor
                        {...defaultEditorOptions}
                        showRunButton={false}
                        style={{
                            borderLeft: '1px solid var(--border)',
                            height: defaultEditorOptions.editorHeight,
                        }}
                    />
                </SandpackLayout>
            </SandpackProvider>
        </SandpackWrapper>
    );
};

export default Sandpack;
