import { Component, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute } from '@angular/router';
import { QuestionSurveyComponent } from '../../../components/question-survey/question-survey.component';
import { SurveyService } from '../../../services/survey.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-survey',
  standalone: true,
  imports: [BreadcrumbsComponent, QuestionSurveyComponent, ReactiveFormsModule],
  templateUrl: './form-survey.component.html',
  styleUrl: './form-survey.component.scss'
})
export default class FormSurveyComponent implements OnInit{

  surveyForm: FormGroup = new FormGroup({});
  survey: any;
  questions: any[] = [];


  constructor(
    private route: ActivatedRoute, 
    private dataService: SurveyService,
    private fb: FormBuilder
  ) {
    this.surveyForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(8), Validators.max(112)]],
      gender: ['male', Validators.required],
      jobCategory: ['student', Validators.required],
      questions: this.fb.array([])
    });
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.getSurveyById(id).subscribe(
        (survey) => {
          this.survey = survey;

          this.dataService.getQuestions(id).subscribe(
            (questions) => {
              this.questions = questions;
              this.buildForm();

              this.questions.forEach(q => {
                this.dataService.getQuestionOptions(id, q.id).subscribe (
                  (options) => {
                    q.options = options;
                  },
                  error => console.error('Error fetching options:', error)
                )
              })
            }
          )

        },
        (error) => console.error('Error fetching survey:', error)
      ); 
    } 
  }


  buildForm() {
    this.questions.forEach(question => {
      this.surveyForm.addControl(question.id, this.fb.control(null));
    });
  }

  onSubmit() {

    const formData = this.surveyForm.value;
    console.log('Respuestas', formData)


    if (this.surveyForm.valid) {
      const formData = this.surveyForm.value;

      // Mapear el formulario a un formato que Firestore espera
      /*const dataToSave = {
        name: formData.name,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        jobCategory: formData.jobCategory,
        questions: formData.questions.map((question: any) => ({
          id: question.id,
          selectedOption: question.selectedOption
        }))
      };
      console.log('Respuestas-dentro', formData)
      console.log('DataToSave-dentro', dataToSave)*/

      
      // Guardar las respuestas en Firestore usando el servicio PreguntasService
      /*this.preguntasService.guardarRespuestas(respuestas).then(
        () => {
          console.log('Respuestas guardadas correctamente en Firestore.');
          // Puedes resetear el formulario aquí si lo deseas
          this.preguntasForm.reset();
        },
        (error) => {
          console.error('Error al guardar las respuestas:', error);
        }
      ); */
    } else {
      console.error('Formulario no válido. Revise los campos.');
    }
  }

}
