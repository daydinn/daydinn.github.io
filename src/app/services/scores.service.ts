import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root", // Stellt sicher, dass der Service global in der gesamten App verfügbar ist.
})
export class ScoresService {
  // Initialisiert die  Scores mit einem Objekt für jede Farbkategorie.
  private scores: {
    [key: string]: BehaviorSubject<number>;
  } = {
    green: new BehaviorSubject<number>(0),
    red: new BehaviorSubject<number>(0),
    blue: new BehaviorSubject<number>(0),
  };

  constructor() {
    // Ruft die Initialwerte aus dem lokalen Speicher auf, wenn der Service instanziiert wird.
    for (let color in this.scores) {
      const storedScore = localStorage.getItem(`score-${color}`);
      if (storedScore) {
        this.scores[color].next(+storedScore);
      }
    }
  }

  // Aktualisiert die Scores für eine bestimmte Farbe.
  addScore(color: string, points: number): void {
    const updatedScore = (this.scores[color].value || 0) + points;
    this.scores[color].next(updatedScore);
    localStorage.setItem(`score-${color}`, updatedScore.toString());
  }

  // Zieht die Punkte von dem Score für eine bestimmte Farbe ab.
  removeScore(color: string, points: number): void {
    let updatedScore = (this.scores[color].value || 0) - points;
    // Score muss eine posizitve Zahl sein
    if (updatedScore < 0) updatedScore = 0;

    this.scores[color].next(updatedScore);
    localStorage.setItem(`score-${color}`, updatedScore.toString());
  }

  // Gibt das Observable des Scores für eine bestimmte Farbe zurück.
  watchScore(color: string) {
    return this.scores[color].asObservable();
  }

  // Ruft den aktuellen Score für eine bestimmte Farbe ab.
  getScore(color: string): number {
    return this.scores[color].value || 0;
  }
}
