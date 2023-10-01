import { Component } from "@angular/core";
import { ScoresService } from "../services/scores.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-scores",
  templateUrl: "./scores.component.html",
  styleUrls: ["./scores.component.scss"],
})
export class ScoresComponent {
  // Variablen der Punkte für jede Farbe.
  greenPoints: number = 0;
  redPoints: number = 0;
  bluePoints: number = 0;

  // Dependency Injection: Einführung des ScoresService in den Konstruktor.

  constructor(private scoresService: ScoresService) {}

  // Ein Array zum Speichern der Abonnements, um später abzumelden
  private subs: Subscription[] = [];

  ngOnInit() {
    // Abonnieret den Punktestand für Grün, Rot und Blau und aktualisiere `greenPoints`.

    this.subs.push(
      this.scoresService.watchScore("green").subscribe((score) => {
        this.greenPoints = score;
      }),

      this.scoresService.watchScore("red").subscribe((score) => {
        this.redPoints = score;
      }),

      this.scoresService.watchScore("blue").subscribe((score) => {
        this.bluePoints = score;
      })
    );
  }

  ngOnDestroy() {
    // Meldet sich von allen Observables ab, wenn die Komponente zerstört wird.
    // um Speicherlecks zu verhindern.
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
