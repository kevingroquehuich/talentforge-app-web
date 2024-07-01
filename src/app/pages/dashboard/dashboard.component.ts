import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { DataService } from '../../services/data.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartDataset, ChartOptions, ChartType } from "chart.js";
import { SurveyQuestion, UserSurveyResponseData } from '../../models/user-survey-response-data.model';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, BreadcrumbsComponent, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, BaseChartDirective, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export default class DashboardComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'name', 'jobCategory', 'date', 'typeSurvey'];
  dataSource = new MatTableDataSource<UserSurveyResponseData>();
  surveyResponses: UserSurveyResponseData[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dataService: DataService) {}

  ngOnInit(): void {
   
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.fetchSurveyResponses();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchSurveyResponses() {
    this.dataService.getResponsesSurvey('lIATWyLizRdCXZxOCbjY').subscribe(data => {
      this.dataSource.data = data;
      this.prepareChartData(data);
      this.barChartData = this.processDataResponses(data);;
      this.surveyResponses = data;
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

  public pieChartType: ChartType  = 'pie';
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
      datasets:  [
        {
          data: Object.values(counts)
        }
      ]
    }
  }






}

