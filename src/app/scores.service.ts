import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root' // Ensures the service is available globally throughout the app.
})
export class ScoresService {





  
  // Initialize scores with an object for each color category.
  private scores: { 
    [key: string]: BehaviorSubject<number> 
} = {
    green: new BehaviorSubject<number>(0),
    red: new BehaviorSubject<number>(0),
    blue: new BehaviorSubject<number>(0)
};

  
constructor() {
  // Fetch initial values from local storage when service is instantiated.
  for (let color in this.scores) {
    const storedScore = localStorage.getItem(`score-${color}`);
    if (storedScore) {
      this.scores[color].next(+storedScore);
    }
  }
}

  // Update the score for a specific color.
  addScore(color: string, points: number): void {
    const updatedScore = (this.scores[color].value || 0) + points;
    this.scores[color].next(updatedScore);
    localStorage.setItem(`score-${color}`, updatedScore.toString());
  }

   // Remove points from the score for a specific color.
  removeScore(color: string, points: number): void {
  let updatedScore = (this.scores[color].value || 0) - points; // Hier haben wir const durch let ersetzt
  // Ensure the score doesn't go negative (optional)
  if (updatedScore < 0) updatedScore = 0;
  
  this.scores[color].next(updatedScore);
  localStorage.setItem(`score-${color}`, updatedScore.toString());
}
  

  // Return the observable of the score for a specific color
  watchScore(color: string) {
    return this.scores[color].asObservable();
  }


  // Get the current score for a specific color.
  getScore(color: string): number {
    return this.scores[color].value || 0;
  }
}