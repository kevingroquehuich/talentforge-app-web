import { Component, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { CardServicesComponent } from '../../components/card-services/card-services.component';
import { CourseData } from '../../models/course-data.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [BreadcrumbsComponent, CardServicesComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export default class CoursesComponent implements OnInit{

  courses: CourseData[] = [];

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.fetchCoursesData()
  }

  fetchCoursesData() {
    this.dataService.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

}
