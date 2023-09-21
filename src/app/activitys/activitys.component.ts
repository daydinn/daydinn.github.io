import { Component,OnInit  } from '@angular/core';
import { Activity} from '../activityInterface';
import { style } from '@angular/animations';
import { ScoresService } from '../scores.service';
import { ACTIVITYS } from '../activitys.config';
import { getFormattedDateTime } from '../date.utils';


@Component({
  selector: 'app-activitys',
  templateUrl: './activitys.component.html',
  styleUrls: ['./activitys.component.scss']
})
export class ActivitysComponent implements OnInit {

  activitys = ACTIVITYS;
  hoveredActivities: Activity[] = [];
  
  showInfoWindow = false;
  selectedActivity: any;

  
  constructor(private scoresService: ScoresService) { }
  

  
  
  ngOnInit() {

    const storedActivities = JSON.parse(localStorage.getItem('activitysList') || 'null');
    if (storedActivities) {
      this.activitys = storedActivities;
    
      }  
      this.hoveredActivities = JSON.parse(localStorage.getItem('hoveredActivities') || '[]');

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
        
        // If the activity isn't already in the hoveredActivities array, add it
        if (!this.hoveredActivities.some(a => a.label === activity.label)) {
            this.hoveredActivities.push(activity);
        }
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
      label: selectedActivity.label
  };

  const savedActivities = JSON.parse(localStorage.getItem('hoveredActivities') || '[]');
  
 
  savedActivities.unshift(activityData);  
  
  localStorage.setItem('hoveredActivities', JSON.stringify(savedActivities));
}


  showActivityInfo(activity: any) {
    this.selectedActivity = activity;
    this.showInfoWindow = true;
  }

  closeActivityInfo() {
    this.showInfoWindow = false;
  }
  
  
  showInfoPage = false; 

  toggleInfoPage() {
    this.showInfoPage = !this.showInfoPage;
  }


  isKlicked = false; 

  toggleClass() {
    this.isKlicked = !this.isKlicked; 
  }

  getHoveredActivities(): Activity[] {
    return this.hoveredActivities;
  }


  unhoverAllActivities() {
    this.activitys.forEach(activity => {
      activity.isHovered = false;
    });
  }


  newActivity = {
    label: '',
    description: '',
    color: 'green',  // default to green
    points: 0,
    isHovered: false,
    img: './assets/customActivity32.png',
    hoveredImg: './assets/customActivity32.png'
};
saveActivity() {
  
  localStorage.setItem('activity', JSON.stringify(this.newActivity));


  this.activitys.push({...this.newActivity});


  this.newActivity = {
      label: '',
      description: '',
      color: 'green',
      points: 0,
      isHovered: false,
      img: './assets/customActivity32.png',
      hoveredImg: './assets/customActivity32.png'
  };
  localStorage.setItem('activitysList', JSON.stringify(this.activitys));
}




}







