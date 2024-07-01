import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { TableUsersComponent } from '../../components/table-users/table-users.component';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, BreadcrumbsComponent, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, BaseChartDirective, MatCardModule, TableUsersComponent, PieChartComponent, BarChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export default class DashboardComponent{



}

