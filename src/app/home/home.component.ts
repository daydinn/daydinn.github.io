import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScoresService } from '../scores.service';
import { Subscription } from 'rxjs';
import { imageUrls, videoUrls, content } from './config';

// Dekoriert die Klasse als Angular-Komponente
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // Initialisiert die Variablen mit Inhalten aus der Konfigurationsdatei
  imageUrls = imageUrls;
  videoUrls = videoUrls;
  content = content;
  isModalOpen = false;

  // Variablen des Begrüßungscontainers
  iconPath: string;
  greeting: string;
  selectedContent: { title: string; message: string };
  selectedImageUrl: string;
  selectedVideoUrl: string;

  // Variablen zum Speichern der Punkte für jede Farbe
  greenPoints: number = 0;
  redPoints: number = 0;
  bluePoints: number = 0;

  // Ein Array zum Speichern der Abonnements, um sicherzustellen, dass wir uns später davon abmelden können
  private subs: Subscription[] = [];

  // // Dependency Injection: Zugriff auf den ScoresService um die Punktenzustände zu verfolgen
  constructor(private scoresService: ScoresService) {}

  ngOnInit() {
    this.selectRandomVideo();
    this.selectRandomImage();
    this.setGreeting();
    this.selectedContent = this.getRandomContent();
    // Beim Initialisieren der Komponente:

    // // Abonniere die Punktzahlen für verschiedene Farben
    this.subs.push(
      this.scoresService.watchScore('green').subscribe((score) => {
        this.greenPoints = score;
      }),
      // Das Gleiche tun für Rot...
      this.scoresService.watchScore('red').subscribe((score) => {
        this.redPoints = score;
      }),
      // ... und Blau.
      this.scoresService.watchScore('blue').subscribe((score) => {
        this.bluePoints = score;
      })
    );
  }

  // Wird aufgerufen, wenn die Komponente zerstört wird
  ngOnDestroy() {
    //Alle Abonnements kündigen
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  // Setzt den Begrüßungstext und das zugehörige Icon basierend auf der aktuellen Uhrzeit
  setGreeting() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      this.greeting = 'Good Morning';
      this.iconPath = 'assets/morning32.png';
    } else if (hour >= 12 && hour < 17) {
      this.greeting = 'Good Afternoon';
      this.iconPath = 'assets/afternoon32.png';
    } else if (hour >= 17 && hour < 21) {
      this.greeting = 'Good Evening';
      this.iconPath = 'assets/evening32.png';
    } else {
      this.greeting = 'Good Night';
      this.iconPath = 'assets/night32.png';
    }
  }
  // Wählt einen zufälligen Inhalt für die Meditationskarte aus
  getRandomContent(): { title: string; message: string } {
    const randomIndex = Math.floor(Math.random() * this.content.length);
    return this.content[randomIndex];
  }
  // Wählt ein zufälliges Bild für die Meditationskarte aus
  selectRandomImage(): void {
    const randomIndex = Math.floor(Math.random() * this.imageUrls.length);
    this.selectedImageUrl = this.imageUrls[randomIndex];
  }
  // Wählt ein zufälliges Video aus
  selectRandomVideo(): void {
    const randomIndex = Math.floor(Math.random() * this.videoUrls.length);
    this.selectedVideoUrl = this.videoUrls[randomIndex];
  }
  // Funktion zum Öffnen der Meditation
  openModal() {
    this.isModalOpen = true;
  }
  // Funktion zum Schließen der Meditation
  closeModal() {
    this.isModalOpen = false;
  }
}
