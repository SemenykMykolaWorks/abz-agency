import {
  Directive,
  ElementRef,
  Input,
  OnInit
} from '@angular/core';
import tippy from 'tippy.js';

/** Directive for creating a tooltip if text does not fit in the block completely. */
@Directive({
  selector: '[appOverflowTooltip]'
})
export class OverflowTooltipDirective implements OnInit {
  @Input() private tooltip: string;

  constructor(private el: ElementRef) {}

  public ngOnInit(): void {
    tippy(this.el.nativeElement, {
      content: this.tooltip,
      size: 'regular',
      maxWidth: 500,
      delay: 300,
      interactiveBorder: 30,
      allowHTML: true
    });
  }
}
