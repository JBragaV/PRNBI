import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Secao3Page } from './secao3.page';

describe('Secao3Page', () => {
  let component: Secao3Page;
  let fixture: ComponentFixture<Secao3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Secao3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Secao3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
