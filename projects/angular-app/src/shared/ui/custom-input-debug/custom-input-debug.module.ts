import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FsdCustomInputModule } from '../custom-input/custom-input.module';
import { CustomInputDebugComponent } from './custom-input-debug.component';

@NgModule({
    declarations: [CustomInputDebugComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FsdCustomInputModule,
    ],
    exports: [CustomInputDebugComponent],
})
export class CustomInputDebugModule {}
