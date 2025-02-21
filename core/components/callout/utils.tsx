import React from 'react';

import { AlertIcon, InfoIcon } from '../icon/icon-list';
import { CalloutVariant } from './types';

export const getVariantIcon = (variant: CalloutVariant): React.ReactNode => {
    switch (variant) {
        case 'info':
            return <InfoIcon size="5" />;
        case 'danger':
            return <AlertIcon size="5" />;
    }
};
