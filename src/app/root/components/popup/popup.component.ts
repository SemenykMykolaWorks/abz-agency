import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Output() public changeClose: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onCloseClick(e: Event): void {
    this.changeClose.emit();
    e.stopPropagation();
    e.preventDefault();
  }

}
