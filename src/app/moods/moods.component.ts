import { Component, OnInit } from "@angular/core";
import { MOODS } from "./moods.config";
import { getFormattedDateTime } from "../helpers/date.utils";
import { OnDestroy } from "@angular/core";
import {
  SAD_SUGGESTIONS,
  TIRED_SUGGESTIONS,
  UNPRODUCTIVE_SUGGESTIONS,
} from "./suggestions.config";
import { MoodsService } from "../services/moods.service";

@Component({
  selector: "app-moods",
  templateUrl: "./moods.component.html",
  styleUrls: ["./moods.component.scss"],
})
export class MoodsComponent implements OnInit, OnDestroy {
  sadSuggestions = SAD_SUGGESTIONS;
  tiredSuggestions = TIRED_SUGGESTIONS;
  unproductiveSuggestions = UNPRODUCTIVE_SUGGESTIONS;

  //Variablen für die stimmungsvorschläge.
  sadSuggestion: string = "";
  tiredSuggestion: string = "";
  unproductiveSuggestion: string = "";

  randomSuggestions: string[] = [];

  moods = MOODS;
  selectedMod: any;

  //Eine Liste der gespeicherten Stimmungen mit Datum.
  savedMoods: { img: string; date: string }[] = [];

  constructor(private moodsService: MoodsService) {}

  ngOnInit(): void {
    this.loadRandomSuggestions();
    this.savedMoods = this.moodsService.loadMoods();
  }

  // Ändert den Auswahlzustand einer Stimmung.
  toggleMoodSelection(mood: any) {
    this.moods
      .filter((m) => m.color === mood.color)
      .forEach((m) => (m.isSelected = false));

    mood.isSelected = !mood.isSelected;

    this.saveMoodWithDate(mood);
  }

  // Lädt gespeicherte Stimmungen.
  loadSavedMoods() {
    this.savedMoods = this.moodsService.loadMoods();
  }
  // Gibt einen zufälligen Stimmungsvorschlag aus einem Array zurück.
  getRandomSuggestionFrom(array: string[]): string {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  }
  // Überprüft, ob eine bestimmte Stimmung ausgewählt ist.
  isMoodSelected(label: string): boolean {
    return this.moods.some((mood) => mood.label === label && mood.isSelected);
  }
  // Setzt die Auswahl der Stimmungen und deren Vorschläge zurück.
  resetMoodSelection(): void {
    this.moods.forEach((mood) => (mood.isSelected = false));
    this.sadSuggestion = null;
    this.tiredSuggestion = null;
    this.unproductiveSuggestion = null;
  }

  //Speichert die ausgewählte Stimmung mit Datum im lokalen Speicher.
  //@TODO wird später mit der Methode aus dem MoodsService ersetzt.
  saveMoodWithDate(selectedMood: any) {
    const formattedDateTime = getFormattedDateTime();

    //setzt die gespeicherte Mods an den Anfang der Liste.
    this.savedMoods.unshift({ img: selectedMood.img, date: formattedDateTime });

    //speichert in den lokalen Speicher
    localStorage.setItem("savedMoods", JSON.stringify(this.savedMoods));
  }

  // Lädt zufällige Stimmungsvorschläge in einem zeitlichen Intervall.

  loadRandomSuggestions(): void {
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
        }, 1200);
      }, 1200);
    }, 1200);
  }

  ngOnDestroy(): void {
    this.resetMoodSelection();
  }
}
