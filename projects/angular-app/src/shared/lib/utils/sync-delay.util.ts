import { isDevMode } from '@angular/core';

export function syncDelay(ms: number): void {
    if (!isDevMode()) {
        console.warn(
            'Using of very CPU intensive syncDelay function in production!'
        );
    }

    const start = Date.now();
    let now = start;

    while (now - start < ms) {
        now = Date.now();
    }
}
