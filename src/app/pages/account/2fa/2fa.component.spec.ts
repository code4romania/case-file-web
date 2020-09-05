import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFAComponent } from './2fa.component';

describe('TwoFAComponent', () => {
  let component: TwoFAComponent;
  let fixture: ComponentFixture<TwoFAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoFAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
