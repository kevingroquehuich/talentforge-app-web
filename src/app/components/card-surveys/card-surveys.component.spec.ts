import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSurveysComponent } from './card-surveys.component';

describe('CardSurveysComponent', () => {
  let component: CardSurveysComponent;
  let fixture: ComponentFixture<CardSurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSurveysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
