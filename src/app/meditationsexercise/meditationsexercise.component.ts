import { Component } from '@angular/core';
import { Subscription, timer, interval } from 'rxjs';

@Component({
  selector: 'app-meditationsexercise',
  templateUrl: './meditationsexercise.component.html',
  styleUrls: ['./meditationsexercise.component.scss']
})
export class MeditationsexerciseComponent {
  phase: 'inhale' | 'hold' | 'exhale' = 'inhale';
  timerActive = false;
  timerValue = 0; // Timer, der die Gesamtzeit zählt
  timerSubscription: Subscription | undefined;
  breathingSubscription: Subscription | undefined;

  inhaleDuration = 4; // in seconds
  holdDuration = 2;   // in seconds
  exhaleDuration = 4; // in seconds

  toggleTimer() {
    this.timerActive = !this.timerActive;

    if (this.timerActive) {
      this.phase = 'inhale';
      this.startBreathing();
      this.timerSubscription = interval(1000).subscribe(() => {
        this.timerValue++;
      });
    } else {
      this.stopBreathing();
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
      this.timerValue = 0;
      this.phase = 'inhale';
    }
  }

  startBreathing() {
    this.initiatePhase(this.phase);
  }

  initiatePhase(phase: 'inhale' | 'hold' | 'exhale') {
    let duration;
    switch (phase) {
      case 'inhale':
        duration = this.inhaleDuration;
        break;
      case 'hold':
        duration = this.holdDuration;
        break;
      case 'exhale':
        duration = this.exhaleDuration;
        break;
    }

    this.breathingSubscription = timer(duration * 1000).subscribe(() => {
      this.nextPhase();
      if (this.timerActive) {
        this.initiatePhase(this.phase);
      }
    });
  }

  stopBreathing() {
    if (this.breathingSubscription) {
      this.breathingSubscription.unsubscribe();
    }
  }

  nextPhase() {
    switch (this.phase) {
      case 'inhale':
        this.phase = 'hold';
        break;
      case 'hold':
        this.phase = 'exhale';
        break;
      case 'exhale':
        this.phase = 'inhale';
        break;
    }
  }
}
