import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LottieAnimationComponent } from '../../components/lottie-animation/lottie-animation.component';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [LottieAnimationComponent],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.scss'
})
export default class OurServicesComponent implements OnInit {

  services: any;

  constructor(public data: DataService) {}

  ngOnInit(): void {
    this.getservices();
  }


  async getservices() {
    this.services = await this.data.getServices();
  }
}
