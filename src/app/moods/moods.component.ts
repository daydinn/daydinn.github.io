import { Component } from '@angular/core';
import { MOODS } from '../moods.config';



@Component({
  selector: 'app-moods',
  templateUrl: './moods.component.html',
  styleUrls: ['./moods.component.scss']
})
export class MoodsComponent {


moods = MOODS;
selectedMod: any;
 

toggleMoodSelection(mood: any) {
  // Alle Mood-Elemente derselben Farbe abwählen
  this.moods.filter(m => m.color === mood.color).forEach(m => m.isSelected = false);
  
  // Das ausgewählte Mood-Element auswählen
  mood.isSelected = true;
}
}



