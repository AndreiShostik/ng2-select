import {Directive, HostListener, Input, OnInit, OnDestroy, ElementRef} from '@angular/core';

@Directive({
  selector: '[offClick]'
})

export class OffClickDirective implements OnInit, OnDestroy {
  public element:ElementRef;

  constructor(element:ElementRef) {
    this.element = element;
  }

  /* tslint:disable */
  @Input('offClick') public offClickHandler: any;
  /* tslint:enable */
  @HostListener('click', ['$event']) public onClick($event: MouseEvent): void {
    $event.data = this.element.nativeElement;
  }

  public ngOnInit(): any {
    setTimeout(() => {document.addEventListener('click', this.offClickHandler);}, 0);
  }

  public ngOnDestroy(): any {
    document.removeEventListener('click', this.offClickHandler);
  }

}
