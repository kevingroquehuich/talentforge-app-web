import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSurveyComponent } from './question-survey.component';

describe('QuestionSurveyComponent', () => {
  let component: QuestionSurveyComponent;
  let fixture: ComponentFixture<QuestionSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
