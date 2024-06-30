import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ServiceData } from '../../../models/service-data.model';
import { LottieAnimationComponent } from '../../../components/lottie-animation/lottie-animation.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [BreadcrumbsComponent, LottieAnimationComponent, MatCardModule],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.scss'
})
export default class ServiceDetailComponent implements OnInit {

  service!: ServiceData;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getServicesById(id)
    }

  }

  getServicesById(id: string) {
    this.dataService.getServiceById(id).subscribe((data) => {
      this.service = data;
      console.log('Service: ', data)
    });
  }

}
