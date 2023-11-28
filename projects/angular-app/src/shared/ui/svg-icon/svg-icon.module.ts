import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgIconComponent } from './svg-icon.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    declarations: [SvgIconComponent],
    exports: [SvgIconComponent],
})
export class SvgIconModule {}
