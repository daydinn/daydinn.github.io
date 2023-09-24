import { Component } from '@angular/core';
import { ScoresService } from '../scores.service';
import { NgChartsModule } from 'ng2-charts';
import { LEVELS } from '../levels.config';


 
type ColorCategory = 'green' | 'red' | 'blue' | 'total';




@Component({
  selector: 'app-user-progress',
  templateUrl: './user-progress.component.html',
  styleUrls: ['./user-progress.component.scss']
})
export class UserProgressComponent {






 
      //Levels von der configdatei
      levels = LEVELS;

   
 
    totalPoints: number;
    greenPoints: number;
    redPoints: number;
    bluePoints: number;

    totalProgressValue: number;
    greenProgressValue: number;
    redProgressValue: number;
    blueProgressValue: number;


  constructor(private scoresService: ScoresService) {}

// Die Punkte, die benötigt werden, um das nächste Level zu erreichen
pointsForNextLevel: { [color: string]: number } = {
  green: 100,
  red: 100,
  blue: 100,
  total: 500  // Setzen Sie hier den gewünschten Wert für den totalen Fortschritt
};




 public lineChartData: { data: number[], label: string }[] = [
  { data: [], label: 'Green Points' },
  { data: [], label: 'Red Points' },
  { data: [], label: 'Blue Points' },
  { data: [], label: 'Total Points' }
];
public lineChartLabels: string[] = []; // für das Datum
  
  ngOnInit() {
    // Punkte abrufen und speichern
    this.greenPoints = this.scoresService.getScore('green');
    this.redPoints = this.scoresService.getScore('red');
    this.bluePoints = this.scoresService.getScore('blue');
    this.totalPoints = this.greenPoints + this.redPoints + this.bluePoints;

    // Setzen Sie die Fortschrittsbalkenwerte (in Prozent)
    this.greenProgressValue = (this.greenPoints / 100) * 100;  // Passen Sie den Teiler an, um die Maximumpunktzahl für 100% festzulegen
    this.redProgressValue = (this.redPoints / 100) * 100;
    this.blueProgressValue = (this.bluePoints / 100) * 100;
    this.totalProgressValue = (this.totalPoints / 300) * 100;  // Wenn 300 die maximale Punktzahl ist
    this.loadSavedMoods();
    this.loadSavedActivities();
    

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`;
    this.lineChartLabels.push(formattedDate); // Aktuelles Datum hinzufügen
    this.lineChartData[0].data.push(this.greenPoints);
    this.lineChartData[1].data.push(this.redPoints);
    this.lineChartData[2].data.push(this.bluePoints);
    this.lineChartData[3].data.push(this.totalPoints);



    this.lineChartData = [
      {
        data: [this.greenPoints],  // Machen Sie es zu einem Array
        label: 'Mental Score',
        backgroundColor: 'rgba(23, 162, 184, 0.5)', // Blue with 50% opacity (#17a2b8)
        borderColor: '#17a2b8' // Solid blue
      } as any, // Bypass TypeScript checking with `as any`
          
      {
        data: [this.redPoints],  // Machen Sie es zu einem Array
        label: 'Physical Score',
        backgroundColor: 'rgba(220, 53, 69, 0.5)', // Red with 50% opacity (#dc3545)
        borderColor: '#dc3545' // Solid red
      } as any, // Bypass TypeScript checking with `as any`
          
      {
        data: [this.bluePoints],  // Machen Sie es zu einem Array
        label: 'Productivity Score',
        backgroundColor: 'rgba(40, 167, 69, 0.5)', // Green with 50% opacity (#28a745)
        borderColor: '#28a745' // Solid green
      } as any, // Bypass TypeScript checking with `as any`
    
      {
        data: [this.totalPoints],  // Machen Sie es zu einem Array
        label: 'Total Score',
        backgroundColor: 'rgba(255, 193, 7, 0.5)', // Yellow with 50% opacity (#ffc107)
        borderColor: '#ffc107' // Solid yellow
      } as any, // Bypass TypeScript checking with `as any`
            
     
    ];

  }

  

getCurrentLevel(points: number, color: ColorCategory): number {
  const levelIndex = Math.min(this.levels[color].length - 1, Math.floor(points / this.pointsForNextLevel[color]));
  return levelIndex;
}

getLevelName(color: ColorCategory, points: number): string {
  return this.levels[color][this.getCurrentLevel(points, color)].label;
}

// und so weiter für andere Methoden...



// Diese Methode berechnet den Level basierend auf den Punkten, 

calculateLevel(points: number): number {
  return Math.floor(points / this.pointsForNextLevel['total']) + 1;
}

calculateProgressValue(points: number, color: ColorCategory): number {
  const currentLevelIndex = this.getCurrentLevel(points, color);
  const pointsForCurrentLevel = currentLevelIndex * this.pointsForNextLevel[color];
  const progressToNextLevel = points - pointsForCurrentLevel;

  return (progressToNextLevel / this.pointsForNextLevel[color]) * 100;
}


//Moods
savedMoods: { img: string, date: string, notes?: string }[] = [];
hoveredActivities: { img: string, date: string, label: string, notes?: string }[] = [];
selectedActivityIndex: number | null = null;
selectedMoodIndex: number | null = null;


loadSavedMoods() {
  const retrievedData = localStorage.getItem('savedMoods');
  if (retrievedData) {
    this.savedMoods = JSON.parse(retrievedData);
  }
}





selectMood(savedMood: any) {
  this.selectedMoodIndex = this.savedMoods.indexOf(savedMood);
}

editNotes(index: number) {
  this.selectedMoodIndex = index;
}

saveNotes() {
  if (this.selectedMoodIndex !== null) {
    // This will save notes in the savedMoods array
    localStorage.setItem('savedMoods', JSON.stringify(this.savedMoods));
    this.selectedMoodIndex = null; // To hide the textarea after saving
  }
}

deleteMood(index: number) {
  this.savedMoods.splice(index, 1);
  localStorage.setItem('savedMoods', JSON.stringify(this.savedMoods));
}

deleteAllSavedMoods() {
  this.savedMoods = [];
  localStorage.removeItem('savedMoods');
}


//activities 





loadSavedActivities() {
  const retrievedData = localStorage.getItem('hoveredActivities');
  if (retrievedData) {
    this.hoveredActivities = JSON.parse(retrievedData);
  }
}

editActivityNotes(index: number) {
  this.selectedActivityIndex = index;
}

saveActivityNotes() {
  localStorage.setItem('hoveredActivities', JSON.stringify(this.hoveredActivities));
  this.selectedActivityIndex = null;
}

deleteAllSavedActivities() {
  this.hoveredActivities = [];
  localStorage.removeItem('hoveredActivities');
}

deleteActivity(index: number) {
  this.hoveredActivities.splice(index, 1);
  localStorage.setItem('hoveredActivities', JSON.stringify(this.hoveredActivities));
}


}

