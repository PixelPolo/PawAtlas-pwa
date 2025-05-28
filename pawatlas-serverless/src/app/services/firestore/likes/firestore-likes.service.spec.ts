import { TestBed } from '@angular/core/testing';

import { FirestoreLikesService } from './firestore-likes.service';

describe('FirestoreLikesService', () => {
  let service: FirestoreLikesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreLikesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
