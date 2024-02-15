import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FsdClickOutsideDirective } from './click-outside.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [FsdClickOutsideDirective],
    exports: [FsdClickOutsideDirective],
})
export class FsdClickOutsideModule {}
