import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

// take from @ng-web-apis/common
// https://github.com/taiga-family/ng-web-apis/blob/main/libs/common/src/tokens/window.ts
export const WINDOW = new InjectionToken<Window>(
    'An abstraction over global window object',
    {
        factory: () => {
            const { defaultView } = inject(DOCUMENT);

            if (!defaultView) {
                throw new Error('Window is not available');
            }

            return defaultView;
        },
    }
);
