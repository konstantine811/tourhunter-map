import { async, TestBed } from '@angular/core/testing';
import { NgZorroModule } from './ng-zorro.module';

describe('NgZorroModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgZorroModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgZorroModule).toBeDefined();
  });
});
