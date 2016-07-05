import { OnInit, OnDestroy, ElementRef } from '@angular/core';
export declare class OffClickDirective implements OnInit, OnDestroy {
    element: ElementRef;
    constructor(element: ElementRef);
    offClickHandler: any;
    onClick($event: MouseEvent): void;
    ngOnInit(): any;
    ngOnDestroy(): any;
}
export interface MouseEvent {
    data: any;
}
