import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionFestivalPage } from './ubicacion-festival.page';

describe('UbicacionFestivalPage', () => {
  let component: UbicacionFestivalPage;
  let fixture: ComponentFixture<UbicacionFestivalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicacionFestivalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionFestivalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
