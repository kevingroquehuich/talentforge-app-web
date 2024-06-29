import { Component, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { CardSurveysComponent } from '../../../components/card-surveys/card-surveys.component';
import { Router } from '@angular/router';
import { SurveyService } from '../../../services/survey.service';

@Component({
  selector: 'app-psychological',
  standalone: true,
  imports: [BreadcrumbsComponent, CardSurveysComponent],
  templateUrl: './psychological.component.html',
  styleUrl: './psychological.component.scss'
})
export default class PsychologicalComponent implements OnInit{

  organizationalSurveys: any;
  psychologicalSurveys: any;

  constructor(
    private router: Router,
    public surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    this.getOrganizationalSurveys();
    this.getPsychologicalSurveys();
  }

  getOrganizationalSurveys() {
    this.surveyService.getOrganizationalSurveys().subscribe(
      surveys => this.organizationalSurveys = surveys,
      error => console.error('Error fetching surveys:', error)
    );
  }

  getPsychologicalSurveys() {
    this.surveyService.getPsychologicalSurveys().subscribe(
      surveys => this.psychologicalSurveys = surveys,
      error => console.error('Error fetching surveys:', error)
    );
  }

}
