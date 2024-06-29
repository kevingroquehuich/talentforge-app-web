import { Component, Input, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../../../services/survey.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-survey',
  standalone: true,
  imports: [BreadcrumbsComponent, ReactiveFormsModule],
  templateUrl: './form-survey.component.html',
  styleUrl: './form-survey.component.scss'
})
export default class FormSurveyComponent implements OnInit{
  surveyForm: FormGroup = new FormGroup({});
  survey: any;
  questionsWithOptions: any[] = [];


  constructor(
    private route: ActivatedRoute, 
    private dataService: SurveyService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.surveyForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(8), Validators.max(112)]],
      gender: ['male', Validators.required],
      jobCategory: ['student', Validators.required],
      questions: this.fb.array([])
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.getSurveyById(id).subscribe(
        (survey) => {
          this.survey = survey;

          this.dataService.getQuestions(id).subscribe(
            (questions) => {
              this.questionsWithOptions = questions;

              this.questionsWithOptions.forEach(q => {
                
                this.dataService.getQuestionOptions(id, q.id).subscribe (
                  (options) => {
                    q.options = options;
                  },
                  error => console.error('Error fetching options:', error)
                )

              });

              this.surveyForm.setControl('questions', this.fb.array(this.loadQuestion(this.questionsWithOptions)));

            }
          )
        },
        (error) => console.error('Error fetching survey:', error)
      ); 
    } 

  }

  get questionsFormArray() {
    return this.surveyForm.get('questions') as FormArray;
  }
  
  loadQuestion(questions: any) {
    return questions.map((question: any) => this.createQuestionsFormGroup(question))
  }

  createQuestionsFormGroup(question: any) {
    return this.fb.group({
      id: [question.id],
      question: [question.statement, Validators.required],
      order: [question.order],
      answer: ['', Validators.required]
    })
  } 
  

  buildForm() {
    this.questionsWithOptions.forEach(question => {
      this.surveyForm.addControl(question.id, this.fb.control(null));
    });
  }

  onSubmit() {

    if (this.surveyForm.valid) {
      const formData = this.surveyForm.value;

      // Mapear el formulario a un formato que Firestore espera
      const dataToSave = {
        typeSurveyId: this.survey.id,
        name: formData.name,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        jobCategory: formData.jobCategory,
        questions: formData.questions.map((question: any) => ({
          id: question.id,
          selectedOption: question.answer
        }))
      };

      console.log('DataToSave-dentro', dataToSave)
      
      this.dataService.saveSurveyResponse(this.survey.id, dataToSave).then(
        () => {
          console.log('Respuestas guardadas correctamente en Firestore.');
          this.surveyForm.reset();
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error al guardar las respuestas:', error);
        }
      ); 
    } else {
      console.error('Formulario no válido. Por favor complete correctamente todos los campos.');
    }
  }

}
