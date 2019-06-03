import { TestBed } from '@angular/core/testing';

import { GetanalyticsService } from './getanalytics.service';

describe('GetanalyticsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetanalyticsService = TestBed.get(GetanalyticsService);
    expect(service).toBeTruthy();
  });
});
