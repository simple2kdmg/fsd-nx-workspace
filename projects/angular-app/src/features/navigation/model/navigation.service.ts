import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    ReplaySubject,
    shareReplay,
    Subject,
    takeUntil,
} from 'rxjs';
import { UpdateRouteProps } from './update-route-props.model';
import { ApplicationPath } from '../../../shared/model';

@Injectable({
    providedIn: 'root',
})
export class NavigationService implements OnDestroy {
    readonly urlWithoutQuery$ = this.router.events.pipe(
        filter((e: Event) => e instanceof NavigationEnd),
        map((e: Event) => {
            const navEndEv = e as NavigationEnd;
            return navEndEv.urlAfterRedirects || navEndEv.url;
        }),
        filter((url) => this.urlRegexp.test(url)),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        map((url) => url!.match(this.urlRegexp)![1] as ApplicationPath),
        distinctUntilChanged(),
        shareReplay({ bufferSize: 1, refCount: true })
    );

    private readonly urlRegexp = new RegExp(/\/([\w-S/]*)(\?|$)/); // get everything between '/' and '?'
    private readonly routeUpdateQueue = new ReplaySubject<UpdateRouteProps>(1);
    private readonly destroy$ = new Subject<void>();

    constructor(private readonly router: Router) {
        this.initRouteChangeSubscription();
    }

    updateRoute(props: UpdateRouteProps): void {
        this.routeUpdateQueue.next(props);
    }

    private initRouteChangeSubscription(): void {
        this.routeUpdateQueue
            .pipe(debounceTime(0), takeUntil(this.destroy$))
            .subscribe(({ url, queryParams }) => {
                this.router.navigate([url], {
                    queryParams,
                    queryParamsHandling: 'merge',
                });
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
