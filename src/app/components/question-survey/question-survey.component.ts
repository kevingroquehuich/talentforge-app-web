import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question-survey',
  standalone: true,
  imports: [],
  templateUrl: './question-survey.component.html',
  styleUrl: './question-survey.component.scss'
})
export class QuestionSurveyComponent {
  @Input() question: any;
}
