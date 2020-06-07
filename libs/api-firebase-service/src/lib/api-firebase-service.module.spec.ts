import { async, TestBed } from '@angular/core/testing';
import { ApiFirebaseServiceModule } from './api-firebase-service.module';

describe('ApiFirebaseServiceModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ApiFirebaseServiceModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ApiFirebaseServiceModule).toBeDefined();
  });
});
