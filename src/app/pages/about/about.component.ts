import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { LottieAnimationComponent } from '../../components/lottie-animation/lottie-animation.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BreadcrumbsComponent, LottieAnimationComponent, MatIconModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export default class AboutComponent {

}
