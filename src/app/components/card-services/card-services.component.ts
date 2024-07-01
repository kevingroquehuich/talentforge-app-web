import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CourseData } from '../../models/course-data.model';

@Component({
  selector: 'app-card-services',
  standalone: true,
  imports: [],
  templateUrl: './card-services.component.html',
  styleUrl: './card-services.component.scss'
})
export class CardServicesComponent {

  @Input() courses: CourseData[] = [];

  constructor(private router: Router) {}

  navigateToDetail(id: string) {
    this.router.navigate(['/courses', id]);
  }
}
