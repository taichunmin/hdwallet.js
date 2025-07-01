import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumpsComponent } from './dumps.component';

describe('Dumps-Component', () => {
  let component: DumpsComponent;
  let fixture: ComponentFixture<DumpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DumpsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DumpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
