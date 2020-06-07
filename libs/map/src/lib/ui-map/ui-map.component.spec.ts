/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UiMapComponent } from './ui-map.component';

describe('UiMapComponent', () => {
  let component: UiMapComponent;
  let fixture: ComponentFixture<UiMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
