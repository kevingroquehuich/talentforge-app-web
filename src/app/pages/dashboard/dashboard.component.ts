import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { DataService } from '../../services/data.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartDataset, ChartOptions, ChartType } from "chart.js";
import { SurveyQuestion, UserSurveyResponseData } from '../../models/user-survey-response-data.model';
import { FormsModule } from '@angular/forms';
import { TableUsersComponent } from '../../components/table-users/table-users.component';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, BreadcrumbsComponent, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, BaseChartDirective, MatCardModule, TableUsersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export default class DashboardComponent implements AfterViewInit {


  surveyResponses1: UserSurveyResponseData[] = [];
  surveyResponses2: UserSurveyResponseData[] = [];
  surveyResponses3: UserSurveyResponseData[] = [];
  surveyResponses4: UserSurveyResponseData[] = [];

  surveyData: any[] = [];

  

  barChartOptions1: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  barChartType1  = 'bar' as const;
  barChartLegend1 = true;
  barChartData1: any[] = [];
  barChartLabels1 = ['Clima Laboral', 'Satisfacción Laboral', 'Evaluación por Desempeño', 'Evaluación por Competencias'];


  constructor(private dataService: DataService) { }

  ngAfterViewInit(): void {
    this.fetchSurveyResponses();
    this.fetchAllSurveyResponses();

  }

  calcularPuntuacionPromedio(responses: UserSurveyResponseData[]): number {
    let totalSum = 0;
    let count = 0;
  
    responses.forEach(response => {
      response.questions.forEach(question => {
        totalSum += question.selectedOption.value;
        count++;
      });
    });
  
    if (count === 0) return 0; // Evitar división por cero
  
    return totalSum / count;
  }

  asignarClasificacion(promedio: number): string {
    if (promedio >= 20 && promedio <= 39) {
      return 'Muy bajo desempeño';
    } else if (promedio >= 40 && promedio <= 59) {
      return 'Bajo desempeño';
    } else if (promedio >= 60 && promedio <= 79) {
      return 'Desempeño aceptable';
    } else if (promedio >= 80 && promedio <= 100) {
      return 'Alto desempeño';
    } else {
      return 'Sin clasificación';
    }
  }


  actualizarDatosGrafico(promedio: number, index: number): void {
    const clasificacion = this.asignarClasificacion(promedio);
    this.barChartData.push({ data: [promedio], label: clasificacion });
  }


  fetchAllSurveyResponses() {
    this.dataService.getResponsesSurvey('lIATWyLizRdCXZxOCbjY').subscribe(data => {
      this.surveyResponses1 = data;
      const promedioEncuesta1 = this.calcularPuntuacionPromedio(data);
      this.actualizarDatosGrafico(promedioEncuesta1, 0);
    });
    
    this.dataService.getResponsesSurvey('PpXbEMSDTnSaaryZnl3y').subscribe(data => {
      this.surveyResponses2 = data;
      const promedioEncuesta2 = this.calcularPuntuacionPromedio(data);
      this.actualizarDatosGrafico(promedioEncuesta2, 1);
    });
    
    this.dataService.getResponsesSurvey('M6JRYSj3qK4fF35y7U2Q').subscribe(data => {
      this.surveyResponses3 = data;
      const promedioEncuesta3 = this.calcularPuntuacionPromedio(data);
      this.actualizarDatosGrafico(promedioEncuesta3, 2);
    });
    
    this.dataService.getResponsesSurvey('QfkopBkUkpDAvKxTOd7J').subscribe(data => {
      this.surveyResponses4 = data;
      const promedioEncuesta4 = this.calcularPuntuacionPromedio(data);
      this.actualizarDatosGrafico(promedioEncuesta4, 3);
    });
  }

  fetchSurveyResponses() {
    this.dataService.getResponsesSurvey('lIATWyLizRdCXZxOCbjY').subscribe(data => {
      this.prepareChartData(data);
      this.barChartData = this.processDataResponses(data);;
      this.surveyResponses1 = data;
    });
  }

  /*========================================== */
  /*===================CHARTS================= */
  /*========================================== */
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

