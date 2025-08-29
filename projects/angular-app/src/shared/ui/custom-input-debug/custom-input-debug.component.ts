import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FsdCustomInputComponent } from '../custom-input/custom-input.component';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FsdCustomInputComponent
  ],
  selector: 'fsd-custom-input-debug',
  styleUrls: ['custom-input-debug.component.less'],
  templateUrl: 'custom-input-debug.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomInputDebugComponent implements OnInit {
  // value: string | null = null;
  inputControl = new FormControl('');
  // disabled = false;
  readonly = false;

  get disabled(): boolean {
    return this.inputControl.disabled;
  }

  constructor(private readonly cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.inputControl.valueChanges.subscribe((value) =>
      console.log(`Value: `, value)
    );
  }

  toggleReadonly(): void {
    this.readonly = !this.readonly;
  }

  toggleDisabled(): void {
    if (this.inputControl.disabled) {
      this.inputControl.enable();
    } else {
      this.inputControl.disable();
    }
  }

  toggleValue(): void {
    // this.value = this.value ? null : 'Toggled value';
    const currentValue = this.inputControl.value;
    this.inputControl.setValue(currentValue ? null : 'Toggled value');
  }

  test(key: string): void {
    console.log('TEST ', key);
  }

  onIconClick(): void {
    console.log('Icon click');
  }
}
