import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { DisabledStateService } from '../../services/disabled-state/disabled-state.service';
import { ComboboxInterface } from '../../../interfaces';

@Component({
  selector: 'custom-combobox',
  imports: [
    NgClass
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomComboboxComponent),
      multi: true
    }
  ],
  templateUrl: './custom-combobox.html',
  styleUrl: './custom-combobox.css'
})
export class CustomComboboxComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnDestroy {

  searchTimeout: any;
  isOpen: boolean = false;
  searchTerm: string = '';
  activeIndex: number = -1;

  options: ComboboxInterface[] = [];

  @Input() customTitle: string | null = null;
  @Input() customOptions: ComboboxInterface[] = [];
  @Input() customSelectedOption: ComboboxInterface | null = null;
  @Output() customSelectedOptionChange: EventEmitter<ComboboxInterface> = new EventEmitter<ComboboxInterface>();

  @ViewChildren('dropdownItem') dropdownItems!: QueryList<ElementRef>;
  @ViewChild('dropdownButton', { static: true }) dropdownButton!: ElementRef<HTMLButtonElement>;

  private subscription?: Subscription;

  constructor(
    private elementRef: ElementRef,
    private disabledState: DisabledStateService
  ) {
    this.options = [...this.customOptions];
  }

  isFieldsetDisabled = false;

  ngOnInit() {
    this.subscription = this.disabledState.disabled$.subscribe(
      (isDisabled) => {
        this.isFieldsetDisabled = isDisabled;
        // Additional logic to handle the disabled state
      }
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private onChange = (value: any) => {};
  private onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.customSelectedOption = this.customOptions.find(
      (item: ComboboxInterface) => item.value === value
    ) || null;
  }

  ngOnChanges() {
    this.options = [...this.customOptions];
  }

  ngAfterViewInit() {
    this.dropdownButton.nativeElement.addEventListener('wheel', this.handleScroll.bind(this));
  }

  get customSelectedOptionName(): string {
    return this.customSelectedOption ? this.customSelectedOption.name : (this.customTitle ? `Select ${this.customTitle}` : '(Select)');
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.searchTerm = '';
      this.options = [...this.customOptions];
      this.activeIndex = this.customSelectedOption ? this.options.findIndex(option => option.name === this.customSelectedOption!.name) : -1;
      setTimeout(() => {
        this.scrollToActiveItem();
      }, 0);
    }
  }

  selectOption(option: ComboboxInterface, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.customSelectedOption = option;
    this.customSelectedOptionChange.emit(this.customSelectedOption);
    this.isOpen = false;
    this.searchTerm = '';
    this.activeIndex = -1;
    this.onChange(option.value);
    this.onTouched();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.isOpen) {
      if (event.key === 'ArrowDown') {
        this.activeIndex = (this.activeIndex + 1) % this.options.length;
        this.scrollToActiveItem();
      } else if (event.key === 'ArrowUp') {
        this.activeIndex = (this.activeIndex - 1 + this.options.length) % this.options.length;
        this.scrollToActiveItem();
      } else if (event.key === 'Enter' && this.activeIndex !== -1) {
        event.preventDefault();
        this.selectOption(this.options[this.activeIndex]);
      } else if (event.key.length === 1) {
        this.searchTerm += event.key.toLowerCase();
        this.filterOptionsBySearchTerm();

        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
          this.searchTerm = '';
        }, 500);
      }
    }
  }

  scrolling = false;

  @HostListener('wheel', ['$event'])
  handleScroll(event: WheelEvent) {
    if (this.scrolling) { return; }
    if (this.dropdownButton && this.dropdownButton.nativeElement.contains(event.target as Node)) {
      event.preventDefault();
      if (this.options.length === 0) return;
      this.scrolling = true;
      const direction = event.deltaY > 0 ? 1 : -1;
      const currentIndex = this.customSelectedOption ? this.options.findIndex(option => option.name === this.customSelectedOption!.name) : -1;
      let newIndex = (currentIndex + direction + this.options.length) % this.options.length;
      this.customSelectedOption = this.options[newIndex];
      this.customSelectedOptionChange.emit(this.customSelectedOption);
      this.onChange(this.customSelectedOption.value);
      this.onTouched();
      setTimeout(() => {
        this.scrolling = false;
      }, 100);
    }
  }

  scrollToActiveItem() {
    if (this.dropdownItems && this.activeIndex >= 0 && this.activeIndex < this.dropdownItems.length) {
      const activeItem = this.dropdownItems.toArray()[this.activeIndex];
      if (activeItem) {
        activeItem.nativeElement.scrollIntoView({
          block: 'center',
          behavior: 'auto'
        });
      }
    }
  }

  filterOptionsBySearchTerm(): void {
    this.options = this.customOptions.filter((option: ComboboxInterface) =>
      option.name.toLowerCase().includes(this.searchTerm)
    );
    this.activeIndex = this.options.length > 0 ? 0 : -1;
  }
}
