import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFestivalPage } from './crear-festival.page';

describe('CrearFestivalPage', () => {
  let component: CrearFestivalPage;
  let fixture: ComponentFixture<CrearFestivalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearFestivalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearFestivalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
