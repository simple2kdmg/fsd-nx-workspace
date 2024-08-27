import {
    Component,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnDestroy,
} from '@angular/core';
import { DefaultPageContentData } from '../../model/default-page-content-data.model';
import { fromEvent, ReplaySubject, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'fsd-default-page-content',
    templateUrl: 'default-page-content.component.html',
    styleUrls: ['default-page-content.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultPageContentComponent implements AfterViewInit, OnDestroy {
    @Input() data: DefaultPageContentData | null = null;
    @Input() primitiveData?: number | null = 0;

    @ViewChild('testButton') testButton: ElementRef | null = null;

    readonly testData$ = new ReplaySubject<string>(1);

    private readonly destroy$ = new Subject();

    get initialize(): boolean {
        console.count('DefaultPageContentComponent redrawn');
        return true;
    }

    onClick(): void {
        console.log('This will trigger change detection');
        this.testData$.next('From Angular (click) handler');
    }

    onOuterClick(e: Event): void {
        console.log('outer click, e: ', e);
    }

    onInnerClick(e: Event): void {
        e.stopPropagation();
        console.log('inner click, e: ', e);
    }

    ngAfterViewInit(): void {
        if (this.testButton) {
            fromEvent(this.testButton.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.testData$.next('From RxJs fromEvent click handler');
                });
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(null);
        this.destroy$.complete();
    }
}
