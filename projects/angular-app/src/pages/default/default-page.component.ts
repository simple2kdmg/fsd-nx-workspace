import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DefaultPageContentData } from './model/default-page-content-data.model';
import { BreakpointsService } from '../../shared/model';
import {
    BehaviorSubject,
    Observable,
    ReplaySubject,
    Subject,
    Subscription,
    combineLatest,
    debounceTime,
    fromEvent,
    interval,
    map,
    mergeMap,
    of,
    share,
    shareReplay,
    startWith,
    tap,
    timer,
    toArray,
} from 'rxjs';
import { buffer, switchMap, window } from 'rxjs/operators';

@Component({
    templateUrl: 'default-page.component.html',
    styleUrls: ['default-page.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultPageComponent {
    data: DefaultPageContentData | null = null;
    primitiveData?: number;

    constructor(private readonly breakpointsService: BreakpointsService) {}

    get initialize(): boolean {
        console.count('DefaultPageComponent redrawn');
        return true;
    }

    toggleContentId(): void {
        this.data = !this.data ? { id: '12345', name: 'test-data' } : null;
        this.primitiveData = !this.primitiveData ? 5 : undefined;
    }
}
