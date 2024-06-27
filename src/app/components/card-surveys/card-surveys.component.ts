import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-surveys',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-surveys.component.html',
  styleUrl: './card-surveys.component.scss'
})
export class CardSurveysComponent {

  @Input() survey: any;

  constructor(private router: Router) {}

  navigateToForm(id: string) {
    this.router.navigate(['/surveys', id]);
  }

}
