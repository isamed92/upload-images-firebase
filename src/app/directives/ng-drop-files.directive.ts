import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  constructor() { }


  @Output() mouseHover: EventEmitter<boolean> = new EventEmitter();

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseHover.emit(true);
  }
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseHover.emit(false);

  }

}
