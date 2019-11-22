import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFestivalPage } from './lista-festival.page';

describe('ListaFestivalPage', () => {
  let component: ListaFestivalPage;
  let fixture: ComponentFixture<ListaFestivalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaFestivalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFestivalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
