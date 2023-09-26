import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Stellt sicher, dass der Service global in der gesamten App verfügbar ist.
})
export class ScoresService {
  // Initialisieren der Scores mit einem Objekt für jede Farbkategorie.
  private scores: {
    [key: string]: BehaviorSubject<number>;
  } = {
    green: new BehaviorSubject<number>(0),
    red: new BehaviorSubject<number>(0),
    blue: new BehaviorSubject<number>(0),
  };

  constructor() {
    // Initialwerte aus dem lokalen Speicher abrufen, wenn der Service instanziiert wird.
    for (let color in this.scores) {
      const storedScore = localStorage.getItem(`score-${color}`);
      if (storedScore) {
        this.scores[color].next(+storedScore);
      }
    }
  }

  // Aktualisieren des Scores für eine bestimmte Farbe.
  addScore(color: string, points: number): void {
    const updatedScore = (this.scores[color].value || 0) + points;
    this.scores[color].next(updatedScore);
    localStorage.setItem(`score-${color}`, updatedScore.toString());
  }

  // Punkte von dem Score für eine bestimmte Farbe abziehen.
  removeScore(color: string, points: number): void {
    let updatedScore = (this.scores[color].value || 0) - points;
    // Score must be positivve
    if (updatedScore < 0) updatedScore = 0;

    this.scores[color].next(updatedScore);
    localStorage.setItem(`score-${color}`, updatedScore.toString());
  }

  // Gibt das Observable des Scores für eine bestimmte Farbe zurück
  watchScore(color: string) {
    return this.scores[color].asObservable();
  }

  // Ruft den aktuellen Score für eine bestimmte Farbe ab.
  getScore(color: string): number {
    return this.scores[color].value || 0;
  }
}
