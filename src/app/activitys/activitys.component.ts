import { Component, OnInit } from '@angular/core';
import { Activity } from '../models/activityInterface';
import { ActivityService } from '../services/activity.service';
import { ScoresService } from '../services/scores.service';
import { ACTIVITYS, ACTIVITYS_VERSION } from './activitys.config';
import { getFormattedDateTime } from '../helpers/date.utils';

@Component({
  selector: 'app-activitys',
  templateUrl: './activitys.component.html',
  styleUrls: ['./activitys.component.scss'],
})
export class ActivitysComponent implements OnInit {

  // Abhängigkeitsinjektion der Services.
  constructor(private scoresService: ScoresService, private activityService: ActivityService) {}

  private _activitys: any[] = [];
  hoveredActivities: Activity[] = []; // Liste von gehoverten Aktivitäten
  selectedActivity: any; // Aktuell ausgewählte Aktivität
  
  maxActivityPoints = 10; // Maximale Punktzahl für Aktivitäten
  minActivityPoints = 0; // Minimale Punktzahl für Aktivitäten

  isClickedInfo = false; //fürInfo-button
  isClickedDelete = false; //für Delete-button
  isClickedAdd = false; //für hinzufügen einer neuen Aktivität

  //Ein/Ausschalter
  showInfoPage = false;
  deleteMode = false;
  showInfoWindow = false; // Steuert das Anzeigen des Infofensters
  showAddNewActivity = false; // Steuert das Hinzufügen einer neuen Aktivität

  //Getter für Aktivitäten
  get activitys(): any[] {
    return this._activitys;
  }

  //Setter für Aktivitäten mit Logging
  set activitys(value: any[]) {
    console.log('Setting activitys:', value);
    this._activitys = value;
  }



  ngOnInit() {
    this.activitys = this.activityService.loadActivitys();

    // Prüft, ob gespeicherte Version veraltet ist um die Aktivitäten aus der Config Datei zu holen.
   

    this.hoveredActivities = JSON.parse(
      localStorage.getItem('hoveredActivities') || '[]'
    );

    this.activitys.forEach((activity) => {
      const hoverState = localStorage.getItem(
        `activity-hovered-${activity.label}`
      );
      activity.isHovered = hoverState === 'true';
    });

    
  }


  // Zeigt Informationen über eine bestimmte Aktivität an.
  showActivityInfo(activity: any) {
    this.selectedActivity = activity;
    this.showInfoWindow = true;
  }
  // Schließt das Infofenster der Aktivität.
  closeActivityInfo() {
    this.showInfoWindow = false;
  }
  
  //Schaltet den Löschmodus um.
  toggleDeleteMode() {
    this.deleteMode = !this.deleteMode;
  }
  // Schaltet die Informationsseite um.
  toggleInfoPage() {
    this.showInfoPage = !this.showInfoPage;
  }

  // Wechselt den Klassenstatus für den Informationsbutton.
  toggleClassInfo() {
    this.isClickedInfo = !this.isClickedInfo;
  }
  // Wechselt den Klassenstatus für den Löschen-Button.
  toggleClassDelete() {
    this.isClickedDelete = !this.isClickedDelete;
  }
  
  // Wechselt den Klassenstatus für den Hinzufügen-Button.
  toggleClassAddNewActivity() {
    this.isClickedAdd = !this.isClickedAdd;
  }
  // Gibt die Liste der gehoverten Aktivitäten zurück.
  getHoveredActivities(): Activity[] {
    return this.hoveredActivities;
  }
  


// Setzt den Hover-Zustand aller Aktivitäten zurück.
unhoverAllActivities() {
 this.activityService.unhoverAllActivities(this._activitys);
 this.activityService.saveActivitys(this.activitys);
}

// Neue Aktivität
newActivity: Activity = {
  label: '',
  description: '',
  color: 'green',
  points: 0,
  isHovered: false,
  img: './assets/customActivity32.png',
  hoveredImg: './assets/customActivity32.png',
  isNewActivity: true,
};

// Fügt eine neue Aktivität hinzu.
createActivity() {
  this.activityService.addActivity(this.activitys, this.newActivity);
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
}

 // Löscht eine ausgewählte Aktivität wenn sie custom ist und wenn das Infofenster nicht angezeigt wird.
 deleteActivity(activity: Activity) {
  if (this.deleteMode && activity.isNewActivity && !this.showInfoPage) {
    this.activityService.deleteActivity(this.activitys, activity);
  } else if (this.deleteMode) {
    alert('Diese Aktivität kann nicht gelöscht werden.');
  }
}


  // Gibt einen formatierten Border-Style zurück, basierend auf der gegebenen Farbe der Aktivität.
  getBorderStyle(color: string): string {
    return `4px solid ${color}`;
  }
  // Schaltet den Hover-Zustand einer Aktivität und aktualisiert Punkte und lokale Speicherung entsprechend.
  toggleHover(activity: Activity) {
    if (!this.deleteMode && !this.showInfoPage) {
      this.activityService.toggleHover(activity);
      this.activityService.saveActivitys(this.activitys);  // Speichert die Aktivitäten.
    }
  }

// Trackt das genaue Datum und die Uhrzeit der gehowerten Aktivitäten.
logHoveredActivity(selectedActivity: Activity) {
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
  
  
  
  
  
}
