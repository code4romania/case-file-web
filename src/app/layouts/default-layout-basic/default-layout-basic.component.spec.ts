import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLayoutBasicComponent } from './default-layout-basic.component';

describe('DefaultLayoutBasicComponent', () => {
  let component: DefaultLayoutBasicComponent;
  let fixture: ComponentFixture<DefaultLayoutBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultLayoutBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultLayoutBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
