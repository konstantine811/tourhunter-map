import { TestBed } from '@angular/core/testing';

import { DataFlattingService } from './data-flatting.service';

describe('DataFlattingService', () => {
  let service: DataFlattingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFlattingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
