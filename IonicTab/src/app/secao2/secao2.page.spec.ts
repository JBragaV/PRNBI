import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Secao2Page } from './secao2.page';

describe('Secao2Page', () => {
  let component: Secao2Page;
  let fixture: ComponentFixture<Secao2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Secao2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Secao2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
