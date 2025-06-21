import { Component, HostListener, Input, ViewEncapsulation } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'custom-modal',
  imports: [
    NgStyle,
    NgClass
  ],
  templateUrl: './custom-modal.html',
  styleUrl: './custom-modal.css',
  encapsulation: ViewEncapsulation.None
})
export class CustomModalComponent {

  @Input() customModalClass: any;
  @Input() customContentClass: any;
  @Input() customCloseClass: any;
  @Input() customModalStyle: any;
  @Input() customContentStyle: any;
  @Input() customCloseStyle: any;

  isVisible: boolean = false;
  shouldSkipClick: boolean = false;

  open(): void {
    this.isVisible = true;
    this.shouldSkipClick = true;
  }

  close(): void {
    this.isVisible = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.shouldSkipClick) {
      this.shouldSkipClick = false;
      return;
    }
    const modal: Element | null = document.querySelector('.custom-modal');
    const modalContent: Element | null = document.querySelector('.custom-modal-content');
    if (
      modal && modal.contains(event.target as Node) &&
      modalContent && !modalContent.contains(event.target as Node)){
      this.close();
    }
  }
}
