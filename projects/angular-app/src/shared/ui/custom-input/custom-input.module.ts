import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FsdCustomInputComponent } from './custom-input.component';

@NgModule({
    declarations: [FsdCustomInputComponent],
    imports: [CommonModule, FormsModule],
    exports: [FsdCustomInputComponent],
})
export class FsdCustomInputModule {}
