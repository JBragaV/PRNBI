import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoFuelPage } from './foto-fuel.page';

describe('FotoFuelPage', () => {
  let component: FotoFuelPage;
  let fixture: ComponentFixture<FotoFuelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotoFuelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoFuelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
