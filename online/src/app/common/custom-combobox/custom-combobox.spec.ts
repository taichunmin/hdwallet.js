import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomComboboxComponent } from './custom-combobox.component';

describe('CustomCombobox-Component', () => {
  let component: CustomComboboxComponent;
  let fixture: ComponentFixture<CustomComboboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomComboboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomComboboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
