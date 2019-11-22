import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisFestivalesPage } from './mis-festivales.page';

describe('MisFestivalesPage', () => {
  let component: MisFestivalesPage;
  let fixture: ComponentFixture<MisFestivalesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisFestivalesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisFestivalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
