import { Component,OnDestroy,OnInit } from '@angular/core';
import { ScoresService } from '../scores.service';
import { Subscription } from 'rxjs';
import { imageUrls, videoUrls, content } from './config';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  imageUrls = imageUrls;
  videoUrls = videoUrls;
  content = content;
  isModalOpen = false;
  
  iconPath: string;
  greeting: string;
  selectedContent: {title: string, message: string};
  selectedImageUrl: string;
  selectedVideoUrl: string;

  // Variables to hold the scores for each color.1
greenPoints: number = 0;
redPoints: number = 0;
bluePoints: number = 0;










  // Ein Array zum Speichern der Abonnements, um sicherzustellen, dass wir uns später davon abmelden können
private subs: Subscription[] = [];

  // Dependency Injection: Hole den ScoreService, um die Punktestände zu verfolgen
  constructor(private scoresService: ScoresService) {}






ngOnInit() {
  this.selectRandomVideo();
  this.selectRandomImage();
  this.setGreeting();
  this.selectedContent = this.getRandomContent();
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


setGreeting() {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    this.greeting = "Good Morning";
    this.iconPath = "assets/morning32.png";
  } else if (hour >= 12 && hour < 17) {
    this.greeting = "Good Afternoon";
    this.iconPath = "assets/afternoon32.png";
  } else if (hour >= 17 && hour < 21) {
    this.greeting = "Good Evening";
    this.iconPath = "assets/evening32.png";
  } else {
    this.greeting = "Good Night";
    this.iconPath = "assets/night32.png";
  }
}
getRandomContent(): {title: string, message: string} {
  const randomIndex = Math.floor(Math.random() * this.content.length);
  return this.content[randomIndex];
}

selectRandomImage(): void {
  const randomIndex = Math.floor(Math.random() * this.imageUrls.length);
  this.selectedImageUrl = this.imageUrls[randomIndex];
}

selectRandomVideo(): void {
  const randomIndex = Math.floor(Math.random() * this.videoUrls.length);
  this.selectedVideoUrl = this.videoUrls[randomIndex];
}

openModal() {
  this.isModalOpen = true;
}

closeModal() {
  this.isModalOpen = false;
}


}
