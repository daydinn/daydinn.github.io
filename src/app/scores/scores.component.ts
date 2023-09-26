import { Component } from '@angular/core';
import { ScoresService } from '../scores.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss'],
})
export class ScoresComponent {
  // Variablen zum Halten der Punktestände für jede Farbe
  greenPoints: number = 0;
  redPoints: number = 0;
  bluePoints: number = 0;

  // Dependency Injection: Einführung des ScoresService in den Konstruktor,
  // sodass wir auf dessen Methoden und Daten zugreifen können
  constructor(private scoresService: ScoresService) {}

  // Ein Array zum Speichern der Abonnements, um sicherzustellen, dass
  // wir uns später davon abmelden können, um Speicherlecks zu vermeiden
  private subs: Subscription[] = [];

  ngOnInit() {
    // Beim Initialisieren der Komponente:

    // Abonniere den Punktestand für Grün und aktualisiere `greenPoints`,
    // wenn sich dieser ändert
    this.subs.push(
      this.scoresService.watchScore('green').subscribe((score) => {
        this.greenPoints = score;
      }),
      // Das Gleiche tun wir für Rot...
      this.scoresService.watchScore('red').subscribe((score) => {
        this.redPoints = score;
      }),
      // ... und Blau.
      this.scoresService.watchScore('blue').subscribe((score) => {
        this.bluePoints = score;
      })
    );
  }

  ngOnDestroy() {
    // Meldet sich von allen Observables ab, wenn die Komponente zerstört wird,
    // um Speicherlecks zu verhindern
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
