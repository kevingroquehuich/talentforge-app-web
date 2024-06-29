import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { DataService } from '../../services/data.service';


export interface UserData {
  id: string;
  name: string;
  jobCategory: string;
  typeSurvey: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BreadcrumbsComponent, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export default class DashboardComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'name', 'jobCategory', 'typeSurvey'];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataService: DataService) {}
  
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

}

