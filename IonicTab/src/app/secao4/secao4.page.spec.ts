import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Secao4Page } from './secao4.page';

describe('Secao4Page', () => {
  let component: Secao4Page;
  let fixture: ComponentFixture<Secao4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Secao4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Secao4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
