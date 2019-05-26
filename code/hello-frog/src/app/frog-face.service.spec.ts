import { TestBed } from '@angular/core/testing';

import { FrogFaceService } from './frog-face.service';

describe('FrogFaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FrogFaceService = TestBed.get(FrogFaceService);
    expect(service).toBeTruthy();
  });
});
