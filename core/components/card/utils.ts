import { isElementOfType } from '@/utils/isElementOfType';
import React from 'react';

import { CardHeader } from './styles';

export function isHeaderElement(
    child: React.ReactNode,
): child is React.ReactElement<{ children: React.ReactNode }> {
    return isElementOfType(child, CardHeader);
}
