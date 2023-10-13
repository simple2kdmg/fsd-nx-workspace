import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostBindingTestComponent } from './host-binding-test.component';

@NgModule({
    imports: [CommonModule],
    declarations: [HostBindingTestComponent],
    exports: [HostBindingTestComponent],
})
export class HostBindingTestModule {}
