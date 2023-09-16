import { Component,OnDestroy,OnInit } from '@angular/core';
import { ScoresService } from '../scores.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {


  // Variables to hold the scores for each color.1
greenPoints: number = 0;
redPoints: number = 0;
bluePoints: number = 0;


  // Ein Array zum Speichern der Abonnements, um sicherzustellen, dass wir uns später davon abmelden können
private subs: Subscription[] = [];

  // Dependency Injection: Hole den ScoreService, um die Punktestände zu verfolgen
  constructor(private scoresService: ScoresService) {}






ngOnInit() {
  // Beim Initialisieren der Komponente: 

  // Abonniere den Punktestand für Grün und aktualisiere `greenPoints`, wenn sich dieser ändert
  this.subs.push(
    this.scoresService.watchScore('green').subscribe(score => {
      this.greenPoints = score;
    }),
    // Das Gleiche tun wir für Rot...
    this.scoresService.watchScore('red').subscribe(score => {
      this.redPoints = score;
    }),
    // ... und Blau.
    this.scoresService.watchScore('blue').subscribe(score => {
      this.bluePoints = score;
    })
  );
}

ngOnDestroy() {
  // Unsubscribe from all observables when the component is destroyed
  this.subs.forEach(sub => sub.unsubscribe());
}


}
