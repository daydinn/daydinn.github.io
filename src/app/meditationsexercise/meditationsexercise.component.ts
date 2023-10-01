import { Component } from "@angular/core";
import { Subscription, timer, interval } from "rxjs";

@Component({
  selector: "app-meditationsexercise",
  templateUrl: "./meditationsexercise.component.html",
  styleUrls: ["./meditationsexercise.component.scss"],
})
export class MeditationsexerciseComponent {
  // Variablen zum Steuern und Anzeigen der Meditation.
  phase: "inhale" | "hold" | "exhale" = "inhale";
  timerActive = false; // Zustand des Timers (aktiv/inaktiv)
  timerValue = 0; // // Wert des Timers in Sekunden
  timerSubscription: Subscription | undefined; // Abonnement für den Timer
  breathingSubscription: Subscription | undefined; // Abonnement für die Atmung

  // Legt der Dauer für jede Atmungsphase fest.
  inhaleDuration = 4; // in seconds
  holdDuration = 2; // in seconds
  exhaleDuration = 4; // in seconds

  // Startet oder stoppt den Timer
  toggleTimer() {
    this.timerActive = !this.timerActive; // Wechselt den Timerzustand.

    if (this.timerActive) {
      this.phase = "inhale"; // Startphase
      this.startBreathing(); // Erstellt einen Timer, der jede Sekunde tickt und den Timerwert erhöht.
      this.timerSubscription = interval(1000).subscribe(() => {
        this.timerValue++;
      });
    } else {
      this.stopBreathing();
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe(); // Beendet das Timer-Abonnement.
      }
      this.timerValue = 0;
      this.phase = "inhale";
    }
  }
  // Beginnt mit dem Atmungszyklus.
  startBreathing() {
    this.initiatePhase(this.phase);
  }

  // Initialisiert eine spezifische Atmungsphase.
  initiatePhase(phase: "inhale" | "hold" | "exhale") {
    let duration;
    // Bestimmt die Dauer der aktuellen Phase.
    switch (phase) {
      case "inhale":
        duration = this.inhaleDuration;
        break;
      case "hold":
        duration = this.holdDuration;
        break;
      case "exhale":
        duration = this.exhaleDuration;
        break;
    }
    // Erstellt einen Timer, der nach der festgelegten Dauer zur nächsten Phase wechselt.
    this.breathingSubscription = timer(duration * 1000).subscribe(() => {
      this.nextPhase();
      if (this.timerActive) {
        this.initiatePhase(this.phase);
      }
    });
  }
  // Beendet den Atmungszyklus.
  stopBreathing() {
    if (this.breathingSubscription) {
      this.breathingSubscription.unsubscribe();
    }
  }
  // Wechselt zur nächsten Phase im Atmungszyklus.
  nextPhase() {
    switch (this.phase) {
      case "inhale":
        this.phase = "hold";
        break;
      case "hold":
        this.phase = "exhale";
        break;
      case "exhale":
        this.phase = "inhale";
        break;
    }
  }
}
