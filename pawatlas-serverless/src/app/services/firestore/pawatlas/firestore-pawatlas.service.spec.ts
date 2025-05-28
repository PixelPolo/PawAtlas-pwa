import { TestBed } from '@angular/core/testing';

import { FirestorePawatlasService } from './firestore-pawatlas.service';

describe('FirestorePawatlasService', () => {
  let service: FirestorePawatlasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestorePawatlasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
