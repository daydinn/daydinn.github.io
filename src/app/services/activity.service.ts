import { Injectable } from "@angular/core";
import { Activity } from "../models/activityInterface";
import { ACTIVITYS, ACTIVITYS_VERSION } from "../activitys/activitys.config";
import { ScoresService } from "../services/scores.service";
import { getFormattedDateTime } from "../helpers/date.utils";

@Injectable({
  providedIn: "root",
})
export class ActivityService {
  constructor(private scoresService: ScoresService) {}

  // Ladet die Aktivitäten aus dem lokalen Speicher oder setzt Standardwerte.
  loadActivitys(): Activity[] {
    const currentVersion = ACTIVITYS_VERSION;
    const storedVersion = +localStorage.getItem("activitysVersion") || 0; // Wandelt String in Zahl um
    // Prüft, ob gespeicherte Version veraltet ist um die Aktivitäten aus der Config Datei zu holen.
    if (storedVersion < currentVersion) {
      localStorage.setItem("activitysList", JSON.stringify(ACTIVITYS));
      localStorage.setItem("activitysVersion", currentVersion.toString());
      return ACTIVITYS;
    } else {
      return (
        JSON.parse(localStorage.getItem("activitysList") || "[]") || ACTIVITYS
      );
    }
  }

  // Speichert die Aktivitäten im lokalen Speicher.
  saveActivitys(activitys: Activity[]): void {
    localStorage.setItem("activitysList", JSON.stringify(activitys));
  }

  // Ändert den Hover-Zustand einer Aktivität.
  toggleHover(activity: Activity): void {
    activity.isHovered = !activity.isHovered;
    if (activity.isHovered) {
      localStorage.setItem(`activity-hovered-${activity.label}`, "true");
      this.scoresService.addScore(activity.color, activity.points);

      this.logHoveredActivity(activity);
    } else {
      localStorage.removeItem(`activity-hovered-${activity.label}`);
      this.scoresService.removeScore(activity.color, activity.points);
    }
  }

  // Setzt den Hover-Zustand für alle Aktivitäten zurück.
  unhoverAllActivities(activitys: Activity[]): void {
    activitys.forEach((activity) => {
      activity.isHovered = false;
      localStorage.setItem(`activity-hovered-${activity.label}`, "false");
    });
  }

  // Trackt das genaue Datum und die Uhrzeit der ausgeführten Aktivität.
  logHoveredActivity(selectedActivity: Activity): void {
    const currentTime = getFormattedDateTime();
    const activityData = {
      img: selectedActivity.hoveredImg,
      date: currentTime,
      label: selectedActivity.label,
    };

    const savedActivities = JSON.parse(
      localStorage.getItem("hoveredActivities") || "[]"
    );
    savedActivities.unshift(activityData);
    localStorage.setItem("hoveredActivities", JSON.stringify(savedActivities));
  }

  // Fügt eine neue Aktivität hinzu.
  addActivity(activitys: Activity[], activity: Activity): void {
    activitys.push(activity);
    this.saveActivitys(activitys);
  }

  // Löscht ine Aktivität.
  deleteActivity(activitys: Activity[], activity: Activity): void {
    const index = activitys.indexOf(activity);
    if (index !== -1) {
      activitys.splice(index, 1);
      localStorage.removeItem(`activity-hovered-${activity.label}`);
      this.saveActivitys(activitys);
    }
  }
}
