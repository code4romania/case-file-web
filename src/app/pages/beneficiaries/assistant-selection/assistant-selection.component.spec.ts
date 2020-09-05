import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantSelectionComponent } from './assistant-selection.component';

describe('AssistantSelectionComponent', () => {
  let component: AssistantSelectionComponent;
  let fixture: ComponentFixture<AssistantSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistantSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
