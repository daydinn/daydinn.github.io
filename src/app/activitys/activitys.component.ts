import { Component, OnInit } from '@angular/core';
import { Activity } from '../activityInterface';
import { style } from '@angular/animations';
import { ScoresService } from '../scores.service';
import { ACTIVITYS, ACTIVITYS_VERSION } from '../activitys.config';
import { getFormattedDateTime } from '../date.utils';

@Component({
  selector: 'app-activitys',
  templateUrl: './activitys.component.html',
  styleUrls: ['./activitys.component.scss'],
})
export class ActivitysComponent implements OnInit {
  private _activitys: any[] = [];

  get activitys(): any[] {
    return this._activitys;
  }

  // Wenn Aktivitäten gesetzt werden, werden sie in der Konsole geloggt
  set activitys(value: any[]) {
    console.log('Setting activitys:', value);
    this._activitys = value;
  }

  hoveredActivities: Activity[] = []; // Liste von gehoverten Aktivitäten

  showInfoWindow = false; // Steuert das Anzeigen des Infofensters
  showAddNewActivity = false; // Steuert das Hinzufügen einer neuen Aktivität
  selectedActivity: any; // Aktuell ausgewählte Aktivität
  maxActivityPoints = 10; // Maximale Punktzahl für Aktivitäten
  minActivityPoints = 0; // Minimale Punktzahl für Aktivitäten

  isKlickedInfo = false; //fürInfo-button
  isKlickedDelete = false; //für Delete-button
  isKlickedAdd = false; //für hinzufügen einer neuen Aktivität

  constructor(private scoresService: ScoresService) {}

  ngOnInit() {
    const currentVersion = ACTIVITYS_VERSION;
    const storedVersion = +localStorage.getItem('activitysVersion') || 0; // Wandelt String in Zahl um

    // Prüfen, ob gespeicherte Version veraltet ist um die Aktivitäten aus der Config Datei zu holen
    if (storedVersion < currentVersion) {
      this.activitys = ACTIVITYS;
      localStorage.setItem('activitysList', JSON.stringify(this.activitys));
      localStorage.setItem('activitysVersion', currentVersion.toString());
    } else {
      // Verwende gespeicherte Aktivitäten
      this.activitys =
        JSON.parse(localStorage.getItem('activitysList') || 'null') ||
        ACTIVITYS;
    }

    this.hoveredActivities = JSON.parse(
      localStorage.getItem('hoveredActivities') || '[]'
    );

    this.activitys.forEach((activity) => {
      const hoverState = localStorage.getItem(
        `activity-hovered-${activity.label}`
      );
      activity.isHovered = hoverState === 'true';
    });

    // Debugging logs
    console.log('Activities being used:', this.activitys);
  }
  // Gibt einen formatierten Border-Style zurück, basierend auf der gegebenen Farbe der Aktivität.
  getBorderStyle(color: string): string {
    return `4px solid ${color}`;
  }
  // Schaltet den Hover-Zustand einer Aktivität und aktualisiert Punkte und lokale Speicherung entsprechend.
  toggleHover(activity: Activity) {
    if (!this.deleteMode && !this.showInfoPage) {
      activity.isHovered = !activity.isHovered;
    }

    if (activity.isHovered) {
      localStorage.setItem(`activity-hovered-${activity.label}`, 'true');
      this.scoresService.addScore(activity.color, activity.points);

      // If the activity isn't already in the hoveredActivities array, add it
      if (!this.hoveredActivities.some((a) => a.label === activity.label)) {
        this.hoveredActivities.push(activity);
      }
      // Speichert eine gehoverte Aktivität mit aktuellem Datum.
      this.saveActivityWithDate(activity);
    } else {
      localStorage.removeItem(`activity-hovered-${activity.label}`);
      this.scoresService.removeScore(activity.color, activity.points);
    }
    localStorage.setItem('activitysList', JSON.stringify(this.activitys));
  }

  saveActivityWithDate(selectedActivity: Activity) {
    const currentTime = getFormattedDateTime();

    const activityData = {
      img: selectedActivity.hoveredImg,
      date: currentTime,
      label: selectedActivity.label,
    };

    const savedActivities = JSON.parse(
      localStorage.getItem('hoveredActivities') || '[]'
    );

    savedActivities.unshift(activityData);

    localStorage.setItem('hoveredActivities', JSON.stringify(savedActivities));
  }
  // Zeigt Informationen über eine bestimmte Aktivität an
  showActivityInfo(activity: any) {
    this.selectedActivity = activity;
    this.showInfoWindow = true;
  }
  // Schließt das Infofenster der Aktivität.
  closeActivityInfo() {
    this.showInfoWindow = false;
  }
  // Schaltet die Informationsseite um.
  showInfoPage = false;
  deleteMode = false;
  // Schaltet die Informationsseite um.
  toggleInfoPage() {
    this.showInfoPage = !this.showInfoPage;
  }

  // Wechselt den Klassenstatus für den Informationsbutton.
  toggleClassInfo() {
    this.isKlickedInfo = !this.isKlickedInfo;
  }
  // Wechselt den Klassenstatus für den Löschen-Button.
  toggleClassDelete() {
    this.isKlickedDelete = !this.isKlickedDelete;
  }
  // Wechselt den Klassenstatus für den Hinzufügen-Button.
  toggleClassAddNewActivity() {
    this.isKlickedAdd = !this.isKlickedAdd;
  }
  // Gibt die Liste der gehoverten Aktivitäten zurück.
  getHoveredActivities(): Activity[] {
    return this.hoveredActivities;
  }
  // Setzt den Hover-Zustand aller Aktivitäten zurück.
  unhoverAllActivities() {
    this.activitys.forEach((activity) => {
      activity.isHovered = false;
      localStorage.setItem(`activity-hovered-${activity.label}`, 'false');
    });
    localStorage.setItem('activitysList', JSON.stringify(this.activitys));
  }
  // Speichert eine neu erstellte Aktivität.
  newActivity = {
    label: '',
    description: '',
    color: 'green',
    points: 0,
    isHovered: false,
    img: './assets/customActivity32.png',
    hoveredImg: './assets/customActivity32.png',
    isNewActivity: true,
  };
  saveActivity() {
    localStorage.setItem('activity', JSON.stringify(this.newActivity));

    this.activitys.push({ ...this.newActivity });

    this.newActivity = {
      label: '',
      description: '',
      color: 'green',
      points: 0,
      isHovered: false,
      img: './assets/customActivity32.png',
      hoveredImg: './assets/customActivity32.png',
      isNewActivity: true,
    };
    localStorage.setItem('activitysList', JSON.stringify(this.activitys));
  }
  // Wechselt den Löschmodus.
  toggleDeleteMode() {
    this.deleteMode = !this.deleteMode;
  }
  // Löscht eine ausgewählte Aktivität, wenn sie nicht neu ist und das Infofenster nicht angezeigt wird.
  deleteActivity(activity: Activity) {
    if (this.deleteMode && !activity.isNewActivity && !this.showInfoWindow) {
      const index = this.activitys.indexOf(activity);
      if (index > -1) {
        this.activitys.splice(index, 1);
        localStorage.removeItem(`activity-hovered-${activity.label}`);
        localStorage.setItem('activitysList', JSON.stringify(this.activitys));
      }
    }

    if (this.deleteMode && !activity.isNewActivity) {
      alert('This activity cannot be deleted.');
    }
  }
}
