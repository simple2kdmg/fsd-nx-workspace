import { Subscription, filter, fromEvent } from 'rxjs';

import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    OnDestroy,
    Output,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
    selector: '[fsdClickOutside]',
})
export class FsdClickOutsideDirective implements AfterViewInit, OnDestroy {
    @Output() clickOutside = new EventEmitter<void>();

    documentClickSubscription: Subscription | undefined;

    constructor(
        private element: ElementRef,
        @Inject(DOCUMENT) private document: Document
    ) {}

    ngAfterViewInit() {
        this.documentClickSubscription = fromEvent(this.document, 'click')
            .pipe(
                filter((event) => {
                    return !this.isInside(event.target as HTMLElement);
                })
            )
            .subscribe(() => {
                this.clickOutside.emit();
            });
    }

    isInside(elementToCheck: HTMLElement): boolean {
        return (
            elementToCheck === this.element.nativeElement ||
            this.element.nativeElement.contains(elementToCheck)
        );
    }

    ngOnDestroy() {
        this.documentClickSubscription?.unsubscribe();
    }
}
