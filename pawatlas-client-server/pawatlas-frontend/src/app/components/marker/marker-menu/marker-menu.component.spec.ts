import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerMenuComponent } from './marker-menu.component';

describe('MarkerMenuComponent', () => {
  let component: MarkerMenuComponent;
  let fixture: ComponentFixture<MarkerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkerMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MarkerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
