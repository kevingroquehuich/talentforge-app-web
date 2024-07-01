import { Component, Input, OnInit } from '@angular/core';
import { SurveyQuestion, UserSurveyResponseData } from '../../models/user-survey-response-data.model';
import { ChartType } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [MatCardModule, BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit {

  @Input() surveyId: string = '';

  surveyResponses: UserSurveyResponseData[] = [];


  constructor(private dataService: DataService) { }


  ngOnInit(): void {
    this.dataService.getResponsesSurvey(this.surveyId).subscribe(data => {
      this.barChartData = this.processDataResponses(data);;
      this.surveyResponses = data;
    });
  }

  public barChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{ stacked: true }],
      yAxes: [{ stacked: true }]
    }
  };
  public barChartLabels = [
    'Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4', 'Pregunta 5',
    'Pregunta 6', 'Pregunta 7', 'Pregunta 8', 'Pregunta 9', 'Pregunta 10',
    'Pregunta 11', 'Pregunta 12', 'Pregunta 13', 'Pregunta 14', 'Pregunta 15',
    'Pregunta 16', 'Pregunta 17', 'Pregunta 18', 'Pregunta 19', 'Pregunta 20',

  ];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = [];
  public barChartPlugins = [];

  private processDataResponses(responses: UserSurveyResponseData[]): any[] {
    const aggregatedData = Array(20).fill(null).map(() => ({
      'Totalmente en desacuerdo': 0,
      'En desacuerdo': 0,
      'Ni de acuerdo ni en desacuerdo': 0,
      'De acuerdo': 0,
      'Totalmente de acuerdo': 0,
    }));

    responses.forEach(response => {
      response.questions.forEach((question: SurveyQuestion, index: number) => {
        const answer = question.selectedOption.name as keyof typeof aggregatedData[0];
        if (aggregatedData[index][answer] !== undefined) {
          aggregatedData[index][answer]++;
        }
      });
    });

    return [
      { data: aggregatedData.map(item => item['Totalmente en desacuerdo']), label: 'Totalmente en desacuerdo' },
      { data: aggregatedData.map(item => item['En desacuerdo']), label: 'En desacuerdo' },
      { data: aggregatedData.map(item => item['Ni de acuerdo ni en desacuerdo']), label: 'Ni de acuerdo ni en desacuerdo' },
      { data: aggregatedData.map(item => item['De acuerdo']), label: 'De acuerdo' },
      { data: aggregatedData.map(item => item['Totalmente de acuerdo']), label: 'Totalmente de acuerdo' },
    ];
  }

}
