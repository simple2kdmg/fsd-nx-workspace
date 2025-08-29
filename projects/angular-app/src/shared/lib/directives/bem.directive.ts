import { Component, Directive, Inject } from '@angular/core';
import { HOST_COMPONENT } from '../../model';

@Directive({
    standalone: true,
    selector: '[fsdBem]',
})
export class BemDirective {
    constructor(@Inject(HOST_COMPONENT) hostComponent: Component) {
        console.log('debug host component: ', hostComponent);
    }
}
