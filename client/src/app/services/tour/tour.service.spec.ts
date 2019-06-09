import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TourService } from './tour.service';

fdescribe('TourService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports : [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: TourService = TestBed.get(TourService);
    expect(service).toBeTruthy();
  });

  it('should have getTours function', () => {
    const service: TourService = TestBed.get(TourService);
    expect(service.getTours).toBeTruthy();
  });
});
