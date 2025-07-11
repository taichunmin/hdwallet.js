import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalComponent } from './terminal.component';

describe('Terminal-Component', () => {
  let component: TerminalComponent;
  let fixture: ComponentFixture<TerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
