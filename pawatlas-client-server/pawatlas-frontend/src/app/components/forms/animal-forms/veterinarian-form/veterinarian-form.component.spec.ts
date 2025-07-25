import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarianFormComponent } from './veterinarian-form.component';

describe('VeterinarianFormComponent', () => {
  let component: VeterinarianFormComponent;
  let fixture: ComponentFixture<VeterinarianFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinarianFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VeterinarianFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
