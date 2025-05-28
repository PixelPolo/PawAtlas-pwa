import { TestBed } from '@angular/core/testing';

import { UserAnimalOwnershipService } from './user-animal-ownership.service';

describe('UserAnimalOwnershipService', () => {
  let service: UserAnimalOwnershipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAnimalOwnershipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
