import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaFestivalPage } from './asistencia-festival.page';

describe('AsistenciaFestivalPage', () => {
  let component: AsistenciaFestivalPage;
  let fixture: ComponentFixture<AsistenciaFestivalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciaFestivalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaFestivalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
