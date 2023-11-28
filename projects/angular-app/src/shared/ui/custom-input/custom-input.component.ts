import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { NOOP_VALUE_ACCESSOR, injectNgControl } from '../../lib';

@Component({
    selector: 'fsd-custom-input',
    templateUrl: 'custom-input.component.html',
    styleUrls: ['custom-input.component.less'],
    providers: [NOOP_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsdCustomInputComponent implements OnInit, OnDestroy {
    @Input()
    readonly = false;

    @Output()
    iconClick = new EventEmitter<null>();

    @ViewChild('input') set inputRef(
        value: ElementRef<HTMLInputElement> | undefined
    ) {
        if (value) {
            this.input = value.nativeElement;
        }
    }

    readonly ngControl = injectNgControl();
    readonly disabled$ = new ReplaySubject<boolean>(1);

    private input?: HTMLInputElement;
    private readonly destroy$ = new Subject();

    ngOnInit(): void {
        this.ngControl.control.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(() =>
                this.disabled$.next(this.ngControl.control.disabled)
            );
    }

    onIconClick(): void {
        if (this.readonly || this.ngControl.control.disabled) {
            return;
        }

        this.iconClick.next(null);
    }

    onReset(): void {
        if (this.ngControl.control.value) {
            this.ngControl.control.setValue(null);
            this.input?.blur();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(null);
        this.destroy$.complete();
    }
}
