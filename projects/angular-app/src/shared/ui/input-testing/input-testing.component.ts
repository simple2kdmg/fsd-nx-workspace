import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'fsd-input-testing',
    styleUrls: ['input-testing.component.less'],
    templateUrl: 'input-testing.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsdInputTestingComponent implements OnInit, OnDestroy {
    @Input() set disabled(value: boolean) {
        console.log('Input disabled setter: ', value);
        this.disabled$.next(value ? true : undefined);
    }

    disabled$ = new BehaviorSubject<true | undefined>(undefined);

    private readonly destroy$ = new Subject<null>();

    ngOnInit(): void {
        this.disabled$
            .pipe(takeUntil(this.destroy$))
            .subscribe((value) => console.log('Input disabled value: ', value));
    }

    ngOnDestroy(): void {
        this.destroy$.next(null);
        this.destroy$.complete();
    }
}
