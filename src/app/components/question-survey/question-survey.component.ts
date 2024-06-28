import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-survey',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './question-survey.component.html',
  styleUrl: './question-survey.component.scss'
})
export class QuestionSurveyComponent {
  @Input() question: any;

  surveyForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.surveyForm = this.fb.group({});
  }
}
