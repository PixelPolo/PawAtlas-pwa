import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightFormComponent } from './weight-form.component';

describe('WeightFormComponent', () => {
  let component: WeightFormComponent;
  let fixture: ComponentFixture<WeightFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeightFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
