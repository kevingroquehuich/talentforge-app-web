import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { CardServicesComponent } from '../../components/card-services/card-services.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [BreadcrumbsComponent, CardServicesComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export default class CoursesComponent {

}
