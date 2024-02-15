import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FsdCustomSelectComponent } from './custom-select.component';

@NgModule({
    imports: [CommonModule],
    declarations: [FsdCustomSelectComponent],
    exports: [FsdCustomSelectComponent],
})
export class FsdCustomSelectModule {}
