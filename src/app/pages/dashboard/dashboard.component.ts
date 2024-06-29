import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { DataService } from '../../services/data.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";


export interface UserData {
  id: string;
  name: string;
  jobCategory: string;
  typeSurvey: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BreadcrumbsComponent, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export default class DashboardComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'name', 'jobCategory', 'typeSurvey'];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getResponsesData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getResponsesData() {
    this.dataService.getResponsesSurvey('lIATWyLizRdCXZxOCbjY').subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
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
  public barChartData = [
    { data: [5, 3, 4, 2, 1, 6, 4, 7, 2, 3, 5, 3, 6, 2, 4, 1, 3, 2, 5, 4], label: 'Totalmente en desacuerdo' },
    { data: [10, 8, 6, 7, 3, 12, 10, 8, 7, 9, 10, 8, 7, 6, 9, 11, 12, 7, 6, 8], label: 'En desacuerdo' },
    { data: [15, 12, 10, 13, 8, 14, 12, 13, 15, 14, 13, 10, 11, 13, 12, 15, 14, 13, 12, 10], label: 'Ni de acuerdo ni en desacuerdo' },
    { data: [20, 18, 15, 17, 13, 18, 17, 20, 19, 18, 20, 17, 18, 20, 19, 17, 18, 15, 17, 20], label: 'De acuerdo' },
    { data: [25, 22, 20, 23, 18, 24, 22, 23, 25, 24, 22, 25, 24, 23, 25, 22, 24, 20, 23, 25], label: 'Totalmente de acuerdo' }
  ];
  public barChartPlugins = [];


  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],

    datasets: [
      {
        data: [40, 45, 50, 55, 60, 65, 70, 75, 70, 60, 50, 45],
        label: 'Angular',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      },
      {
        data: [45, 50, 60, 70, 75, 65, 50, 60, 55, 50, 45, 45],
        label: 'React',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(0,255,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };

  public lineChartLegend = true;

}

