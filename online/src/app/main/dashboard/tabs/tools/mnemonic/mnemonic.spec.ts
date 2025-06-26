import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MnemonicComponent } from './mnemonic.component';

describe('Mnemonic-Component', () => {
  let component: MnemonicComponent;
  let fixture: ComponentFixture<MnemonicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MnemonicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MnemonicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
