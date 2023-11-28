import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FsdMapperPipe } from './mapper.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [FsdMapperPipe],
    exports: [FsdMapperPipe],
})
export class FsdMapperPipeModule {}
