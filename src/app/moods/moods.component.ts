import { Component, OnInit } from '@angular/core';
import { MOODS } from '../moods.config';
import { getFormattedDateTime } from '../date.utils';



@Component({
  selector: 'app-moods',
  templateUrl: './moods.component.html',
  styleUrls: ['./moods.component.scss']
})
export class MoodsComponent {


moods = MOODS;
selectedMod: any;


savedMoods: { img: string, date: string }[] = [];

constructor() { }

ngOnInit(): void {
  const retrievedData = localStorage.getItem('savedMoods');
  if (retrievedData) {
    this.savedMoods = JSON.parse(retrievedData);
  }
  console.log(this.savedMoods);
}


toggleMoodSelection(mood: any) {
  // Alle Mood-Elemente derselben Farbe abwählen
  this.moods.filter(m => m.color === mood.color).forEach(m => m.isSelected = false);
  
  // Assuming the toggle logic toggles the 'isSelected' property of mood
  mood.isSelected = !mood.isSelected;

  // Save the selected mood with the current date
  this.saveMoodWithDate(mood);
  
}

saveMoodWithDate(selectedMood: any) {
  const formattedDateTime = getFormattedDateTime();
  
  // Hier haben wir push durch unshift ersetzt
  this.savedMoods.unshift({ img: selectedMood.img, date: formattedDateTime });
  
  // Store in localStorage
  localStorage.setItem('savedMoods', JSON.stringify(this.savedMoods));
}



loadSavedMoods() {
  const storedMoods = localStorage.getItem('savedMoods');
  if (storedMoods) {
    this.savedMoods = JSON.parse(storedMoods);
  }

}
}



