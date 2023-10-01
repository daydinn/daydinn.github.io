import { Injectable } from '@angular/core';
import { MOODS } from '../moods/moods.config';
import { getFormattedDateTime } from '../helpers/date.utils';

@Injectable({
  providedIn: 'root'
})
export class MoodsService {

  constructor() { }


// Ladet die Stimmungen aus dem lokalen Storage und setzt Standardwerte.
loadMoods(): any[] {
  const storedMoods = localStorage.getItem('savedMoods');
  return storedMoods ? JSON.parse(storedMoods) : [];
}


// Speichert die Stimmungen im lokalen Speicher.
saveMoods(moods: any[]): void {
  localStorage.setItem('savedMoods', JSON.stringify(moods));
}


//Ändert den Auswahlzustand einer Stimmung und speichert.
toggleMoodSelection(moods: any[], mood: any): void {
  // Deaktiviert die Stimmungen mit der gleichen Farbe.
  moods.filter(m => m.color === mood.color).forEach(m => m.isSelected = false);

  // Ändert den Auswahlszustand der aktuellen Stimmung.
  mood.isSelected = !mood.isSelected;

  // Speichert die aktualisierte Stimmungsliste.
  this.saveMoodWithDate(moods, mood);
}


  // Speichert die ausgewählte Stimmung mit Datum im lokalen Speicher.
  saveMoodWithDate(moods: any[], selectedMood: any): void {
    const formattedDateTime = getFormattedDateTime();

    // Fügt die ausgewählte Stimmung am Anfang der Liste hinzu.
    moods.unshift({ img: selectedMood.img, date: formattedDateTime });

    // Speichert die aktualisierte Stimmungsliste.
    this.saveMoods(moods);
  }

    // Setzt die Stimmungsvorschläge zurück.
    resetMoodSelection(moods: any[]): void {
      moods.forEach(mood => mood.isSelected = false);
    }




}
