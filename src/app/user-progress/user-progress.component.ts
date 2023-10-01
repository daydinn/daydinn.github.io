import { Component } from "@angular/core";
import { ScoresService } from "../services/scores.service";
import { NgChartsModule } from "ng2-charts";
import { LEVELS } from "./levels.config";
// Typdefinition für verschiedene Farbkategorien
type ColorCategory = "green" | "red" | "blue" | "total";

@Component({
  selector: "app-user-progress",
  templateUrl: "./user-progress.component.html",
  styleUrls: ["./user-progress.component.scss"],
})
export class UserProgressComponent {
  Math = Math; // Ermöglicht den Zugriff auf Math-Funktionen

  // Pagination-Einstellungen
  currentPageMoods: number = 1; //aktuelle seite
  currentPageActivities: number = 1; //aktuelle seite
  itemsPerPage: number = 10; // Anzahl der Einträge pro Seite

  levels = LEVELS;

  // Punkte und Fortschrittsvariablen
  totalPoints: number;
  greenPoints: number;
  redPoints: number;
  bluePoints: number;

  totalProgressValue: number;
  greenProgressValue: number;
  redProgressValue: number;
  blueProgressValue: number;

  constructor(private scoresService: ScoresService) {}

  //Erforderliche Punkte zum Erreichen der nächsten Stufe
  pointsForNextLevel: { [color: string]: number } = {
    green: 100,
    red: 100,
    blue: 100,
    total: 500, // der Wert für den totalen Fortschritt
  };
  // Datenstruktur für das Diagramm
  public lineChartData: { data: number[]; label: string }[] = [
    { data: [], label: "Green Points" },
    { data: [], label: "Red Points" },
    { data: [], label: "Blue Points" },
    { data: [], label: "Total Points" },
  ];
  public lineChartLabels: string[] = []; // für das Datum

  ngOnInit() {
    // Punkte abrufen und speichern
    this.greenPoints = this.scoresService.getScore("green");
    this.redPoints = this.scoresService.getScore("red");
    this.bluePoints = this.scoresService.getScore("blue");
    this.totalPoints = this.greenPoints + this.redPoints + this.bluePoints;

    // Setzen der Fortschrittsbalkenwerte (in Prozent)
    this.greenProgressValue = (this.greenPoints / 100) * 100; // Anpassung der Teile, um die Maximumpunktzahl für 100% festzulegen
    this.redProgressValue = (this.redPoints / 100) * 100;
    this.blueProgressValue = (this.bluePoints / 100) * 100;
    this.totalProgressValue = (this.totalPoints / 300) * 100;
    this.loadSavedMoods();
    this.loadSavedActivities();

    const currentDate = new Date();
    const formattedDate = `${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")}.${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${currentDate.getFullYear()}`;

    this.lineChartLabels.push(formattedDate); // Aktuelles Datum hinzufügen
    this.lineChartData[0].data.push(this.greenPoints);
    this.lineChartData[1].data.push(this.redPoints);
    this.lineChartData[2].data.push(this.bluePoints);
    this.lineChartData[3].data.push(this.totalPoints);

    this.lineChartData = [
      {
        data: [this.greenPoints], // Erstellt ein Array aus grünen Punkten
        label: "Mental Score",
        backgroundColor: "rgba(40, 167, 69, 0.5)",

        borderColor: "#17a2b8",
      } as any, // Bypass TypeScript checking with `as any`

      {
        data: [this.redPoints], // Erstellt ein Array aus roten Punkten
        label: "Physical Score",
        backgroundColor: "rgba(220, 53, 69, 0.5)",
        borderColor: "#dc3545",
      } as any,

      {
        data: [this.bluePoints], // Erstellt ein Array aus blauen Punkten
        label: "Productivity Score",
        backgroundColor: "rgba(23, 162, 184, 0.5)",
        borderColor: "#28a745",
      } as any,

      {
        data: [this.totalPoints], // Erstellt ein Array aus gesamten Punkten
        label: "Total Score",
        backgroundColor: "rgba(255, 193, 7, 0.5)",
        borderColor: "#ffc107", // Solid yellow
      } as any,
    ];
  }
  // Funktionen zur Berechnung von Levels und Fortschritt
  getCurrentLevel(points: number, color: ColorCategory): number {
    const levelIndex = Math.min(
      this.levels[color].length - 1,
      Math.floor(points / this.pointsForNextLevel[color])
    );
    return levelIndex;
  }
  //liefert den Namen anhand von Farbe und Punkte
  getLevelName(color: ColorCategory, points: number): string {
    return this.levels[color][this.getCurrentLevel(points, color)].label;
  }

  // berechnet den Level basierend auf den Punkten,
  calculateLevel(points: number): number {
    return Math.floor(points / this.pointsForNextLevel["total"]) + 1;
  }

  /*Berechnet den Fortschrittswert basierend auf den gegebenen Punkten und der Farbkategorie und
    gibt Prozentsatz des Frotschritts zum nächsten Level
   */
  calculateProgressValue(points: number, color: ColorCategory): number {
    const currentLevelIndex = this.getCurrentLevel(points, color);
    const pointsForCurrentLevel =
      currentLevelIndex * this.pointsForNextLevel[color];
    const progressToNextLevel = points - pointsForCurrentLevel;

    return (progressToNextLevel / this.pointsForNextLevel[color]) * 100;
  }

  savedMoods: { img: string; date: string; notes?: string }[] = [];
  hoveredActivities: {
    img: string;
    date: string;
    label: string;
    notes?: string;
  }[] = [];
  // Indexwerte um Notizen zu bearbeiten
  selectedActivityIndex: number | null = null;
  // Index der ausgewählten Stimmung, um Notizen zu bearbeiten.
  selectedMoodIndex: number | null = null;
  //Lädt gespeicherte Stimmungen aus dem lokalen Speicher.
  loadSavedMoods() {
    const retrievedData = localStorage.getItem("savedMoods");
    if (retrievedData) {
      this.savedMoods = JSON.parse(retrievedData);
    }
  }

  //Wählt eine bestimmte gespeicherte Stimmung aus, um sie zu bearbeiten oder anzuzeigen.

  selectMood(savedMood: any) {
    this.selectedMoodIndex = this.savedMoods.indexOf(savedMood);
  }

  //Setzt den Index der ausgewählten Stimmung für die Bearbeitung von Notizen.

  editNotes(index: number) {
    this.selectedMoodIndex = index;
  }

  // Speichert die Notizen für die ausgewählte Stimmung und aktualisiert den lokalen Speicher.

  saveNotes() {
    if (this.selectedMoodIndex !== null) {
      // Dadurch werden die Notizen im Array savedMoods gespeichert
      localStorage.setItem("savedMoods", JSON.stringify(this.savedMoods));
      this.selectedMoodIndex = null; // so wird de textarea ausgeblendet nach dem speichern
    }
  }

  // Entfernt eine bestimmte Stimmung aus dem Array und aktualisiert den lokalen Speicher.

  deleteMood(index: number) {
    console.log("Deleting mood at index:", index);
    this.savedMoods.splice(index, 1);
    console.log("SavedMoods after deletion:", this.savedMoods);
    localStorage.setItem("savedMoods", JSON.stringify(this.savedMoods));
  }

  // Löscht alle gespeicherten Stimmungen und leert den zugehörigen Eintrag im lokalen Speicher.

  deleteAllSavedMoods() {
    this.savedMoods = [];
    localStorage.removeItem("savedMoods");
  }

  // Lädt gespeicherte Aktivitäten aus dem lokalen Speicher.

  loadSavedActivities() {
    const retrievedData = localStorage.getItem("hoveredActivities");
    if (retrievedData) {
      this.hoveredActivities = JSON.parse(retrievedData);
    }
  }

  // Setzt den Index der aktuell ausgewählten Aktivität für die Bearbeitung von Notizen.

  editActivityNotes(index: number) {
    this.selectedActivityIndex = index;
  }

  //Speichert Notizen für eine ausgewählte Aktivität und aktualisiert den lokalen Speicher.

  saveActivityNotes() {
    localStorage.setItem(
      "hoveredActivities",
      JSON.stringify(this.hoveredActivities)
    );
    this.selectedActivityIndex = null;
  }

  //Entfernt alle gespeicherten Aktivitäten und leert den zugehörigen Eintrag im lokalen Speicher.

  deleteAllSavedActivities() {
    this.hoveredActivities = [];
    localStorage.removeItem("hoveredActivities");
  }

  //Löscht eine bestimmte Aktivität basierend auf dem Index und aktualisiert den lokalen Speicher.

  deleteActivity(index: number) {
    console.log("Deleting activity at index:", index);
    this.hoveredActivities.splice(index, 1);
    console.log("HoveredActivities after deletion:", this.hoveredActivities);
    localStorage.setItem(
      "hoveredActivities",
      JSON.stringify(this.hoveredActivities)
    );
  }

  //Verringert die aktuelle Seitenzahl für die Anzeige von Aktivitäten.

  decrementPageActivities() {
    if (this.currentPageActivities > 1) {
      this.currentPageActivities--;
    }
  }

  //Erhöht die aktuelle Seitenzahl für die Anzeige von Aktivitäten.

  incrementPageActivities() {
    if (
      this.currentPageActivities <
      Math.ceil(this.hoveredActivities.length / this.itemsPerPage)
    ) {
      this.currentPageActivities++;
    }
  }

  //Verringert die aktuelle Seitenzahl für die Anzeige von Stimmungen.

  decrementPageMoods() {
    if (this.currentPageMoods > 1) {
      this.currentPageMoods--;
    }
  }

  //Erhöht die aktuelle Seitenzahl für die Anzeige von Stimmungen.

  incrementPageMoods() {
    if (
      this.currentPageMoods <
      Math.ceil(this.savedMoods.length / this.itemsPerPage)
    ) {
      this.currentPageMoods++;
    }
  }
}
