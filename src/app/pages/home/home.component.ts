import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MapsComponent } from '../../components/maps/maps.component';
import * as AOS from 'aos';
import { LottieAnimationComponent } from '../../components/lottie-animation/lottie-animation.component';
import { CountUpComponent } from '../../components/count-up/count-up.component';
import { AuthenticationComponent } from '../../components/authentication/authentication.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MapsComponent, 
    LottieAnimationComponent, 
    CountUpComponent, 
    AuthenticationComponent,
    ContactFormComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent implements AfterViewInit, OnInit{

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    AOS.init();
  }

}
