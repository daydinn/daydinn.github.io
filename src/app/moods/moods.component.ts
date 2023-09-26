import { Component, OnInit } from '@angular/core';
import { MOODS } from '../moods.config';
import { getFormattedDateTime } from '../date.utils';
import { OnDestroy } from '@angular/core';

import {
  SAD_SUGGESTIONS,
  TIRED_SUGGESTIONS,
  UNPRODUCTIVE_SUGGESTIONS,
} from '../suggestions.config';

@Component({
  selector: 'app-moods',
  templateUrl: './moods.component.html',
  styleUrls: ['./moods.component.scss'],
})
export class MoodsComponent implements OnInit, OnDestroy {
  sadSuggestions = SAD_SUGGESTIONS;
  tiredSuggestions = TIRED_SUGGESTIONS;
  unproductiveSuggestions = UNPRODUCTIVE_SUGGESTIONS;

  //Variablen für die stimmungsvorschläge
  sadSuggestion: string = '';
  tiredSuggestion: string = '';
  unproductiveSuggestion: string = '';

  randomSuggestions: string[] = [];

  moods = MOODS;
  selectedMod: any;

  // Liste der gespeicherten Stimmungen mit Datum
  savedMoods: { img: string; date: string }[] = [];

  constructor() {}

  ngOnInit(): void {
    //Versucht, gespeicherte Stimmungen aus dem localStorage zu laden
    const retrievedData = localStorage.getItem('savedMoods');
    if (retrievedData) {
      this.savedMoods = JSON.parse(retrievedData);
    }
    // Lädt zufällige Stimmungsvorschläge in einem zeitlichen Intervall
    setTimeout(() => {
      this.sadSuggestion = this.getRandomSuggestionFrom(this.sadSuggestions);

      setTimeout(() => {
        this.tiredSuggestion = this.getRandomSuggestionFrom(
          this.tiredSuggestions
        );

        setTimeout(() => {
          this.unproductiveSuggestion = this.getRandomSuggestionFrom(
            this.unproductiveSuggestions
          );
        }, 1000);
      }, 1000);
    }, 1000);
  }

  ngOnDestroy(): void {
    this.resetMoodSelection();
  }
  // Wechselt die Auswahl der Stimmung
  toggleMoodSelection(mood: any) {
    this.moods
      .filter((m) => m.color === mood.color)
      .forEach((m) => (m.isSelected = false));

    mood.isSelected = !mood.isSelected;

    this.saveMoodWithDate(mood);
  }
  // Speichert die ausgewählte Stimmung mit Datum in localStorage
  saveMoodWithDate(selectedMood: any) {
    const formattedDateTime = getFormattedDateTime();

    // Hier haben wir push durch unshift ersetzt
    this.savedMoods.unshift({ img: selectedMood.img, date: formattedDateTime });

    // Store in localStorage
    localStorage.setItem('savedMoods', JSON.stringify(this.savedMoods));
  }
  // Lädt gespeicherte Stimmungen aus dem localStorage
  loadSavedMoods() {
    const storedMoods = localStorage.getItem('savedMoods');
    if (storedMoods) {
      this.savedMoods = JSON.parse(storedMoods);
    }
  }
  // Gibt einen zufälligen Stimmungsvorschlag aus einem Array zurück
  getRandomSuggestionFrom(array: string[]): string {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  }
  // Überprüft, ob eine bestimmte Stimmung ausgewählt ist
  isMoodSelected(label: string): boolean {
    return this.moods.some((mood) => mood.label === label && mood.isSelected);
  }
  // Setzt die Auswahl der Stimmungen und deren Vorschläge zurück
  resetMoodSelection(): void {
    this.moods.forEach((mood) => (mood.isSelected = false));
    this.sadSuggestion = null;
    this.tiredSuggestion = null;
    this.unproductiveSuggestion = null;
  }
}
