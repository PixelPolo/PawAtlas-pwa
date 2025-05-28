import { TestBed } from '@angular/core/testing';

import { PromptInstallService } from './prompt-install.service';

describe('PromptInstallService', () => {
  let service: PromptInstallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromptInstallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
