import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntropyComponent } from './entropy.component';

describe('Entropy-Component', () => {
  let component: EntropyComponent;
  let fixture: ComponentFixture<EntropyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntropyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntropyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
