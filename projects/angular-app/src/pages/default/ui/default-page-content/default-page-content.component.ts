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
import { Subject } from 'rxjs';

@Component({
  standalone: true,
    selector: 'fsd-default-page-content',
    templateUrl: 'default-page-content.component.html',
    styleUrls: ['default-page-content.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultPageContentComponent implements AfterViewInit, OnDestroy {
    @Input() data: DefaultPageContentData | null = null;
    @Input() primitiveData?: number | null = 0;

    @ViewChild('testButton') testButton: ElementRef | null = null;

    private readonly destroy$ = new Subject();

    get initialize(): boolean {
        console.count('DefaultPageContentComponent redrawn');
        return true;
    }

    onClick(): void {
        console.log('This will trigger change detection');
    }

    ngAfterViewInit(): void {
        if (this.testButton) {
            /* fromEvent(this.testButton.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    console.log('Check change detection!');
                }); */
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(null);
        this.destroy$.complete();
    }
}
