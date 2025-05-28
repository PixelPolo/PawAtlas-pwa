import { TestBed } from '@angular/core/testing';

import { StorageImageService } from './storage-image.service';

describe('StorageImageService', () => {
  let service: StorageImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
