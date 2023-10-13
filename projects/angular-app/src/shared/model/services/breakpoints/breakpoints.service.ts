import { Inject, Injectable, OnDestroy } from '@angular/core';
import {
    Observable,
    Subject,
    debounceTime,
    distinctUntilChanged,
    fromEvent,
    map,
    shareReplay,
    startWith,
    takeUntil,
} from 'rxjs';
import { WINDOW } from '../../tokens/window.token';
import { BREAKPOINTS } from '../../../lib/constants/breakpoints.const';
import { Breakpoint, BreakpointKey } from '../../models/breakpoint.model';
import { coerceArray } from '../../../lib';

const BREAKPOINT_VALUES: Breakpoint[] = Object.values(BREAKPOINTS);

@Injectable()
export class BreakpointsService implements OnDestroy {
    private readonly cachedStreams = new Map<string, Observable<boolean>>();
    private readonly destroy$ = new Subject();

    private readonly activeBreakpoint$ = fromEvent(this.window, 'resize').pipe(
        startWith(null),
        debounceTime(100),
        map(() => {
            const windowWidth = Math.max(
                this.window.innerWidth,
                this.window.visualViewport?.width || 0
            );

            const correspondingValue = BREAKPOINT_VALUES.find(
                ({ fromW, upToW }) =>
                    windowWidth >= fromW && windowWidth < upToW
            );

            if (!correspondingValue) {
                console.warn(
                    `BreakpointService: no value for width ${windowWidth}px. Fallback to 'md'.`
                );
                return BREAKPOINTS.md;
            }

            return correspondingValue;
        }),
        distinctUntilChanged(),
        shareReplay({ bufferSize: 1, refCount: true }),
        takeUntil(this.destroy$)
    );

    constructor(@Inject(WINDOW) private readonly window: Window) {
        // ====DEBUG START====
        /* setTimeout(() => {
            console.log(`Current cache 1s: `, this.cachedStreams);
        }, 1000);
        setTimeout(() => {
            console.log(`Current cache 6s: `, this.cachedStreams);
        }, 6000);
        setTimeout(() => {
            console.log(`Current cache 8s: `, this.cachedStreams);
        }, 8000); */
        // ====DEBUG END====
    }

    /**
     * @param key one or more keys to match.
     * @returns stream containing boolean result.
     */
    matchBreakpoint(key: BreakpointKey | BreakpointKey[]): Observable<boolean> {
        const coerced = coerceArray(key);
        const uniqueKey = coerced.reduce(
            (result, curr) => `${result}-${curr}`,
            ''
        );

        if (this.cachedStreams.has(uniqueKey)) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return this.cachedStreams.get(uniqueKey)!;
        }

        // We manually count number of subscription to delete stream from cache
        // when refCount === 0.
        let refCount = 0;

        const internalSource = this.activeBreakpoint$.pipe(
            map((activeBreakpoint) =>
                coerced.some((value) => value === activeBreakpoint.key)
            ),
            distinctUntilChanged()
        );

        // We have to create our own Observable to be able to delete values from cache.
        const cachedStream$ = new Observable<boolean>((subscriber) => {
            const subcription = internalSource.subscribe(subscriber);
            refCount++;

            return () => {
                subcription.unsubscribe();
                refCount--;
                if (refCount === 0) {
                    this.cachedStreams.delete(uniqueKey);
                }
            };
        });

        this.cachedStreams.set(uniqueKey, cachedStream$);

        return cachedStream$;
    }

    /**
     * @param key breakpoint key to match up from. Match is inclusive. E.g. if use `xl` then it will match `xl`, `xxl` and `xxxl`.
     * @returns stream containing boolean result.
     */
    matchUp(key: BreakpointKey): Observable<boolean> {
        const correspondingValueIndex = BREAKPOINT_VALUES.findIndex(
            (value) => value.key === key
        );
        const matchGroupKeys = BREAKPOINT_VALUES.slice(
            correspondingValueIndex
        ).map((value) => value.key);

        return this.matchBreakpoint(matchGroupKeys);
    }

    /**
     * @param key breakpoint key to match down from. Match is exlusive. E.g. if use `md` then it will match `xs` and `sm`.
     * @returns stream containing boolean result.
     */
    matchDown(key: BreakpointKey): Observable<boolean> {
        const correspondingValueIndex = BREAKPOINT_VALUES.findIndex(
            (value) => value.key === key
        );
        const matchGroupKeys = BREAKPOINT_VALUES.slice(
            0,
            correspondingValueIndex
        ).map((value) => value.key);

        return this.matchBreakpoint(matchGroupKeys);
    }

    ngOnDestroy(): void {
        this.destroy$.next(null);
        this.destroy$.complete();
    }
}
