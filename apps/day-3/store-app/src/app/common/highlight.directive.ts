import { Directive, ElementRef, OnInit, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  @Input('appHighlight') color: string;

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.color = this.color || 'yellow';
  }

  @HostListener('mouseover') onmouseover() {
    this.setColor(this.color);
  }

  @HostListener('mouseout') onmouseout() {
    this.setColor(null);
  }

  private setColor(color) {
    this.element.nativeElement.style.backgroundColor = color;
  }
}
