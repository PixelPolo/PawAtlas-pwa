import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominatimDetailsComponent } from './nominatim-details.component';

describe('NominatimDetailsComponent', () => {
  let component: NominatimDetailsComponent;
  let fixture: ComponentFixture<NominatimDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NominatimDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NominatimDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
