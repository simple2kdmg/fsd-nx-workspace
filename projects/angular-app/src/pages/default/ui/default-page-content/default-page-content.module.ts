import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPageContentComponent } from './default-page-content.component';

@NgModule({
    imports: [CommonModule],
    declarations: [DefaultPageContentComponent],
    exports: [DefaultPageContentComponent],
})
export class DefaultPageContentModule {}
