import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fsd-custom-input-debug',
    styleUrls: ['custom-input-debug.component.less'],
    templateUrl: 'custom-input-debug.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomInputDebugComponent {
    value: string | null = null;
    readonly = false;
    disabled = false;

    toggleReadonly(): void {
        this.readonly = !this.readonly;
    }

    toggleDisabled(): void {
        this.disabled = !this.disabled;
    }

    toggleValue(): void {
        this.value = this.value ? null : 'Toggled value';
    }
}
