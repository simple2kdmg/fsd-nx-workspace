import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EMPTY_FUNC } from '../../lib';
import { ReplaySubject, combineLatest, distinctUntilChanged, map, tap } from 'rxjs';

@Component({
    selector: 'fsd-custom-select',
    styleUrls: ['./custom-select.component.less'],
    templateUrl: './custom-select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FsdCustomSelectComponent,
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsdCustomSelectComponent<T> implements ControlValueAccessor {
    @Input() set options(value: T[] | null | undefined) {
        this.options$.next(value ?? []);
    }
    @Input() keyProperty?: keyof T;
    @Input() labelProperty?: keyof T;
    @Input() placeholder = 'Select value';

    onChange = EMPTY_FUNC;
    onTouch = EMPTY_FUNC;

    readonly value$ = new ReplaySubject<T | null | undefined>(1);
    readonly options$ = new ReplaySubject<T[]>(1);

    readonly valueLabel$ = this.value$.pipe(
        map((value) => this.validateValue(value)),
        distinctUntilChanged(this.isEqual),
        tap((value) => this.onChange(value)),
        map((value) => this.getLabel(value))
    );
    readonly optionLabels$ = this.options$.pipe(map((options) => options.map((option) => this.getLabel(option))));

    writeValue(value: T | null | undefined): void {
        this.value$.next(value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    private validateValue(value: T | null | undefined): T | null {
        return value === null || value === undefined || value === '' ? null : value;
    }

    private isEqual(value1: T | null, value2: T | null): boolean {
        if (value1 && value2) {
            return this.getKey(value1) === this.getKey(value2);
        }

        return value1 === value2;
    }

    private getKey(value: T): string {
        return String(value[this.keyProperty as keyof T] ?? value);
    }

    private getLabel(value: T | null): string {
        return value ? String(value[this.labelProperty as keyof T] ?? value) : this.placeholder;
    }

    /* setDisabledState?(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    } */
}
