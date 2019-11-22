import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionFestivalPage } from './descripcion-festival.page';

describe('DescripcionFestivalPage', () => {
  let component: DescripcionFestivalPage;
  let fixture: ComponentFixture<DescripcionFestivalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescripcionFestivalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescripcionFestivalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
