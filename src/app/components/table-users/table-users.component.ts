import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserSurveyResponseData } from '../../models/user-survey-response-data.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatCardModule],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.scss'
})
export class TableUsersComponent implements AfterViewInit{

  @Input() surveyId: string | any = null;

  displayedColumns: string[] = ['name', 'jobCategory', 'date', 'typeSurvey'];
  dataSource = new MatTableDataSource<UserSurveyResponseData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataService: DataService) { }

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
    this.dataService.getResponsesSurvey(this.surveyId).subscribe(data => {
      this.dataSource.data = data;
    });
  }

}
