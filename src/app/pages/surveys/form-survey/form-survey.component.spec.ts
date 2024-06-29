import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSurveyComponent } from './form-survey.component';

describe('FormSurveyComponent', () => {
  let component: FormSurveyComponent;
  let fixture: ComponentFixture<FormSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
