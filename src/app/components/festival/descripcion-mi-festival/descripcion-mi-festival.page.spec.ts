import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionMiFestivalPage } from './descripcion-mi-festival.page';

describe('DescripcionMiFestivalPage', () => {
  let component: DescripcionMiFestivalPage;
  let fixture: ComponentFixture<DescripcionMiFestivalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescripcionMiFestivalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescripcionMiFestivalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
