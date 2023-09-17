import { Component,OnInit  } from '@angular/core';
import { Activity} from '../activityInterface';
import { style } from '@angular/animations';
import { ScoresService } from '../scores.service';
import { ACTIVITYS } from '../activitys.config';


@Component({
  selector: 'app-activitys',
  templateUrl: './activitys.component.html',
  styleUrls: ['./activitys.component.scss']
})
export class ActivitysComponent implements OnInit {

  activitys = ACTIVITYS;
  
  showInfoWindow = false;
  selectedActivity: any;

  
  constructor(private scoresService: ScoresService) { }

  
  
  ngOnInit() {
    this.activitys.forEach(activity => {
        if (localStorage.getItem(`activity-hovered-${activity.label}`)) {
            activity.isHovered = true;
        }
    });
}
  
  
  
  
  
  
  
  
  getBorderStyle(color: string): string {
    return `4px solid ${color}`; 
  }

  toggleHover(activity: Activity) {
    activity.isHovered = !activity.isHovered;
    if (activity.isHovered) {
        localStorage.setItem(`activity-hovered-${activity.label}`, 'true');
        this.scoresService.addScore(activity.color, activity.points);
    } else {
        localStorage.removeItem(`activity-hovered-${activity.label}`);
        this.scoresService.removeScore(activity.color, activity.points);
    }
}

  showActivityInfo(activity: any) {
    this.selectedActivity = activity;
    this.showInfoWindow = true;
  }

  closeActivityInfo() {
    this.showInfoWindow = false;
  }
  
  
  showInfoPage = false; // Variable, um den Zustand der Info-Seite zu steuern

  toggleInfoPage() {
    this.showInfoPage = !this.showInfoPage;
  }


  isKlicked = false; // Die Klasse wird zunächst nicht hinzugefügt

  toggleClass() {
    this.isKlicked = !this.isKlicked; // Umkehren des Status der Klasse
  }
}






