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
  showAddNewActivity = false;
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
     
    if (!this.deleteMode && !this.showInfoPage){
     
      activity.isHovered = !activity.isHovered;
    }
    
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
  deleteMode = false;

  toggleInfoPage() {
    this.showInfoPage = !this.showInfoPage;
  }


  isKlickedInfo= false;
  isKlickedDelete= false;
  isKlickedAdd= false;

  toggleClassInfo() {
    this.isKlickedInfo = !this.isKlickedInfo; 
  }

  toggleClassDelete() {
    this.isKlickedDelete = !this.isKlickedDelete; 
  }

  toggleClassAddNewActivity(){
    this.isKlickedAdd = !this.isKlickedAdd; 


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
    hoveredImg: './assets/customActivity32.png',
    isNewActivity: true,
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
      hoveredImg: './assets/customActivity32.png',
      isNewActivity: true,
  };
  localStorage.setItem('activitysList', JSON.stringify(this.activitys));
}

toggleDeleteMode() {
  this.deleteMode = !this.deleteMode;
}

deleteActivity(activity: Activity) {
  if (this.deleteMode && !activity.isNewActivity && !this.showInfoWindow) {
    const index = this.activitys.indexOf(activity);
    if (index > -1) {
      this.activitys.splice(index, 1);
      localStorage.removeItem(`activity-hovered-${activity.label}`);
      localStorage.setItem('activitysList', JSON.stringify(this.activitys));
      // if you also store activities in another array or object, remember to delete from there too
    }
    
  }
  
  if(this.deleteMode && !activity.isNewActivity) {
    alert("This activity cannot be deleted.");
  }
}
}





