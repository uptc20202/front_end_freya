import { TestBed } from '@angular/core/testing';

import { NumberNormalizerService } from './number-normalizer.service';

describe('NumberNormalizerService', () => {
  let service: NumberNormalizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberNormalizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
