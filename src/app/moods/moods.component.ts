import { Component } from '@angular/core';
import { Mood} from '../moodInterface';



@Component({
  selector: 'app-moods',
  templateUrl: './moods.component.html',
  styleUrls: ['./moods.component.scss']
})
export class MoodsComponent {

moods = [
  { label: "Sad", color: "green",img: "/assets/sadface64.png", isSelected: false, points: 0 },
  { label: "Neutral", color: "green",img: "/assets/neutralface64.png", isSelected: false, points: 0 },
  { label: "Happy", color: "green", img: "/assets/happyface.svg", isSelected: false, points: 0 },
  { label: "Tired", color: "red", img: "/assets/tiredman64.png", isSelected: false, points: 0 },
  { label: "Standing", color: "red", img: "/assets/standingman64.png", isSelected: false, points: 0 },
  { label: "Energic", color: "red", img: "/assets/energicman64.png", isSelected: false, points: 0 },
  { label: "Unproductive", color: "blue", img: "/assets/speedometerlow64.png", isSelected: false, points: 0 },
  { label: "Normalproductive", color: "blue", img: "/assets/speedometermed64.png", isSelected: false, points: 0 },
  { label: "Highproductive", color: "blue", img: "/assets/speedometerhigh64.png", isSelected: false, points: 0 }

]

selectedMod: any;
 

toggleMoodSelection(mood: any) {
  // Alle Mood-Elemente derselben Farbe abwählen
  this.moods.filter(m => m.color === mood.color).forEach(m => m.isSelected = false);
  
  // Das ausgewählte Mood-Element auswählen
  mood.isSelected = true;
}
}



