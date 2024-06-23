import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CardServicesComponent } from '../../components/card-services/card-services.component';
import { LottieAnimationComponent } from '../../components/lottie-animation/lottie-animation.component';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [CardServicesComponent, LottieAnimationComponent],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.scss'
})
export default class OurServicesComponent implements OnInit {

  constructor(public data: DataService) {}
  services: any;

  ngOnInit(): void {
    this.getservices();
  }


  async getservices() {
    this.services = await this.data.getServices();
  }
}
