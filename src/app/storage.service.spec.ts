import { TestBed } from '@angular/core/testing';

import { FirebaseStorageRestService } from './storage.service';

describe('FirebaseStorageRestService', () => {
  let service: FirebaseStorageRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseStorageRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
