import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiarsComponent } from './beneficiars.component';

describe('BeneficiarsComponent', () => {
  let component: BeneficiarsComponent;
  let fixture: ComponentFixture<BeneficiarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
