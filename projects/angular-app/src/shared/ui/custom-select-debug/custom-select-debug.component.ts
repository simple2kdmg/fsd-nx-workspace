import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

type SelectDebugOption = Readonly<{
    id: string;
    value: string;
}>;

@Component({
    selector: 'fsd-custom-select-debug',
    styleUrls: ['custom-select-debug.component.less'],
    templateUrl: 'custom-select-debug.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSelectDebugComponent implements OnInit {
    count = 4;

    selectControl = new FormControl<SelectDebugOption | null>(null);
    selectOptions = this.generateOptions();

    selectOptions$ = new BehaviorSubject(this.selectOptions);

    get disabled(): boolean {
        return this.selectControl.disabled;
    }

    ngOnInit(): void {
        this.selectControl.valueChanges.subscribe((value) => console.log(`Select value: `, value));
    }

    generateOptions(): SelectDebugOption[] {
        return new Array(this.count).fill(null).map((_, index) => ({
            id: `id_${index + 1}`,
            value: `value_${index + 1}`,
        }));
    }

    pushOption(): void {
        this.count++;
        this.selectOptions.push({ id: `id_${this.count}`, value: `value_${this.count}` });
        this.selectOptions$.next([...this.selectOptions]);
    }

    popOption(): void {
        this.count--;
        this.selectOptions.pop();
        this.selectOptions$.next([...this.selectOptions]);
    }

    selectWrong(): void {
        this.selectControl.patchValue({ id: 'id_8', value: 'value_8' });
    }

    toggleDisabled(): void {
        if (this.selectControl.disabled) {
            this.selectControl.enable();
        } else {
            this.selectControl.disable();
        }
    }
}
