import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesoPage } from './peso.page';

describe('PesoPage', () => {
  let component: PesoPage;
  let fixture: ComponentFixture<PesoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
