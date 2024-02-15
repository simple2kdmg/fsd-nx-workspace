import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomSelectDebugComponent } from './custom-select-debug.component';
import { FsdCustomSelectModule } from '../custom-select/custom-select.module';

@NgModule({
    declarations: [CustomSelectDebugComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FsdCustomSelectModule,
    ],
    exports: [CustomSelectDebugComponent],
})
export class CustomSelectDebugModule {}
