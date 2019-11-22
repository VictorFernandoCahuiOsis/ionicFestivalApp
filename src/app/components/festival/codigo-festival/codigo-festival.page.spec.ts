import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoFestivalPage } from './codigo-festival.page';

describe('CodigoFestivalPage', () => {
  let component: CodigoFestivalPage;
  let fixture: ComponentFixture<CodigoFestivalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigoFestivalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoFestivalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
