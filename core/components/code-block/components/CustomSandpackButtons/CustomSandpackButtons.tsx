'use client';

import Icon from '@/core/components/icon';
import { Button } from '@/core/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/core/components/ui/tooltip';
import {
    UnstyledOpenInCodeSandboxButton,
    useSandpack,
    useSandpackConsole,
    useSandpackNavigation,
} from '@codesandbox/sandpack-react';

export const CustomRunButton = () => {
    const { sandpack } = useSandpack();
    const { status, runSandpack } = sandpack;

    if (status === 'running') {
        return null;
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        aria-label="Run"
                        onClick={runSandpack}
                        size="sm"
                        variant="outline"
                    >
                        <Icon.Play />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Run</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export const CustomRefreshButton = () => {
    const { refresh } = useSandpackNavigation();
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        aria-label="Refresh pane"
                        onClick={refresh}
                        size="sm"
                        variant="outline"
                    >
                        <Icon.Repeat />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Refresh pane</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export const CustomGoToCodesandboxButton = () => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        aria-label="Open in Codesandbox"
                        asChild
                        size="sm"
                        variant="outline"
                    >
                        <UnstyledOpenInCodeSandboxButton>
                            <Icon.Stack />
                        </UnstyledOpenInCodeSandboxButton>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Open in Codesandbox</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export const CustomClearConsoleButton = ({
    onClear,
}: {
    onClear: () => void;
}) => {
    const { reset } = useSandpackConsole({ resetOnPreviewRestart: false });

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        aria-label="Clear console"
                        onClick={() => {
                            reset();
                            onClear();
                        }}
                        size="sm"
                        variant="outline"
                    >
                        <Icon.X />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Clear console</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
