import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-count-up',
  standalone: true,
  imports: [],
  templateUrl: './count-up.component.html',
  styleUrl: './count-up.component.scss'
})
export class CountUpComponent implements OnInit {

  @Input() target: number = 0;
  @Input() description: string = '';
  @Input() icon: string = ''; 
  displayValue: number = 0;
  duration: number = 4000;


  ngOnInit(): void {
    this.countUp();
  }

  countUp(): void {
    const startTimestamp = performance.now();
    const endTimestamp = startTimestamp + this.duration;
    const step = () => {
      const now = performance.now();
      const progress = Math.min((now - startTimestamp) / this.duration, 1);
      this.displayValue = Math.floor(progress * this.target);
      if (now < endTimestamp) {
        requestAnimationFrame(step);
      } else {
        this.displayValue = this.target;
      }
    };
    requestAnimationFrame(step);
  }

}
