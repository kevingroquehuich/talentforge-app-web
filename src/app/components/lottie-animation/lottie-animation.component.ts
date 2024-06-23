import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-lottie-animation',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './lottie-animation.component.html',
  styleUrl: './lottie-animation.component.scss'
})
export class LottieAnimationComponent implements OnChanges {

  @Input() animationPath: string = ''; // Parámetro de entrada para la ruta del archivo JSON
  @Input() height: string = '';

  options: AnimationOptions = {
    path: '', // Inicialmente vacío, se actualizará en ngOnChanges
    loop: true,
    autoplay: true
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['animationPath']) { // Accede a 'animationPath' con corchetes
      this.options = {
        ...this.options,
        path: this.animationPath
      };
    }
  }

}
