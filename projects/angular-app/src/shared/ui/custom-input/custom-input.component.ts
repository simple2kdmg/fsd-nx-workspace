import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EMPTY_FUNC } from '../../lib/constants/empty.const';

@Component({
    selector: 'fsd-custom-input',
    templateUrl: 'custom-input.component.html',
    styleUrls: ['custom-input.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FsdCustomInputComponent,
            multi: true,
        },
    ],
})
export class FsdCustomInputComponent implements ControlValueAccessor {
    @Input()
    readonly = false;

    @Input()
    disabled = false;

    internalValue: string | null = null;

    private onChange = EMPTY_FUNC;
    private onTouched = EMPTY_FUNC;

    set value(value: string | null) {
        this.internalValue = value;
        this.onChange(value);
    }

    writeValue(value: string | null): void {
        this.value = value;
    }

    registerOnChange(onChange: (value: string | null) => void): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: () => void): void {
        this.onTouched = onTouched;
    }

    /* setDisabledState(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    } */
}
