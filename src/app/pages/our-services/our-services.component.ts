import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LottieAnimationComponent } from '../../components/lottie-animation/lottie-animation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [LottieAnimationComponent],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.scss'
})
export default class OurServicesComponent implements OnInit {

  services: any;

  constructor(public data: DataService, private router: Router) {}

  ngOnInit(): void {
    this.fetchServicesData();
  }

  fetchServicesData() {
    this.data.getServices().subscribe((data) => {
      this.services = data
    });
  }

  navigateToDetail(id: string) {
    this.router.navigate(['/services', id]);
  }
}
