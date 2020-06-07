import { async, TestBed } from '@angular/core/testing';
import { DataUtilsModule } from './data-utils.module';

describe('DataUtilsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataUtilsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataUtilsModule).toBeDefined();
  });
});
