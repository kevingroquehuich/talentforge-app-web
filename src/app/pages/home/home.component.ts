import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MapsComponent } from '../../components/maps/maps.component';
import * as AOS from 'aos';
import PureCounter from '@srexi/purecounterjs';
import { LottieAnimationComponent } from '../../components/lottie-animation/lottie-animation.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MapsComponent, LottieAnimationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent implements AfterViewInit, OnInit{

  ngAfterViewInit(): void {
    new PureCounter();
  }

  ngOnInit(): void {
    AOS.init();
  }

}
