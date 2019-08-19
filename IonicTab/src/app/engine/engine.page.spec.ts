import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnginePage } from './engine.page';

describe('EnginePage', () => {
  let component: EnginePage;
  let fixture: ComponentFixture<EnginePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnginePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnginePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
