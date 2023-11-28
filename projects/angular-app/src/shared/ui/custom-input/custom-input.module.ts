import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FsdCustomInputComponent } from './custom-input.component';
import { SvgIconModule } from '../svg-icon/svg-icon.module';

@NgModule({
    declarations: [FsdCustomInputComponent],
    imports: [CommonModule, ReactiveFormsModule, SvgIconModule],
    exports: [FsdCustomInputComponent],
})
export class FsdCustomInputModule {}
