import { Component, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute } from '@angular/router';
import { QuestionSurveyComponent } from '../../../components/question-survey/question-survey.component';
import { SurveyService } from '../../../services/survey.service';

@Component({
  selector: 'app-form-survey',
  standalone: true,
  imports: [BreadcrumbsComponent, QuestionSurveyComponent],
  templateUrl: './form-survey.component.html',
  styleUrl: './form-survey.component.scss'
})
export default class FormSurveyComponent implements OnInit{

  survey: any;
  questions: any[] = [];

  constructor(private route: ActivatedRoute, private dataService: SurveyService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.getSurveyById(id).subscribe(
        (survey) => {
          this.survey = survey;
          console.log('survey', survey)

          this.dataService.getQuestions(id).subscribe(
            (questions) => {
              this.questions = questions;
              console.log('questions', questions)

              this.questions.forEach(q => {
                this.dataService.getQuestionOptions(id, q.id).subscribe (
                  (options) => {
                    q.options = options;
                    console.log(`Options for question ${q.id}:`, options);
                  },
                  error => console.error('Error fetching options:', error)
                )
              })
            }
          )

        },
        (error) => console.error('Error fetching survey:', error)

        /*questions => {
          console.log('Questions:', questions);
          this.questions = questions;
          this.questions.forEach(question => {
            this.dataService.getQuestionOptions(id, question.id).subscribe(
              options => {
                console.log(`Options for question ${question.id}:`, options); // Añadir log
                question.options = options;
              },
              error => console.error('Error fetching options:', error) // Añadir log
            );
          });
        },
        error => console.error('Error fetching survey:', error) // Añadir log */
      ); 
    }
    
  }

}
