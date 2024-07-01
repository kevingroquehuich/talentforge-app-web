import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { UserSurveyResponseData } from '../../models/user-survey-response-data.model';
import { BaseChartDirective } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartDirective, MatCardModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit{

  @Input() surveyResponses: UserSurveyResponseData[] = [];

  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        fullSize: true
      }
    },
  };

  public pieChartType: ChartType = 'pie';
  public pieChartData!: ChartData<'pie', number[], string | string[]>;


  ngOnInit(): void {
    this.prepareChartData(this.surveyResponses);
  }

  prepareChartData(surveyResponses: UserSurveyResponseData[]) {
    const counts: Record<string, number> = {};
    surveyResponses.forEach(response => {
      response.questions.forEach(question => {
        const optionName = question.selectedOption.name;
        if (counts[optionName]) {
          counts[optionName]++;
        } else {
          counts[optionName] = 1;
        }
      });
    });

    this.pieChartData = {
      labels: Object.keys(counts),
      datasets: [
        {
          data: Object.values(counts)
        }
      ]
    }
  }


}
