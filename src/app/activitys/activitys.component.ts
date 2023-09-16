import { Component,OnInit  } from '@angular/core';
import { Activity} from '../activityInterface';
import { style } from '@angular/animations';
import { ScoresService } from '../scores.service';
@Component({
  selector: 'app-activitys',
  templateUrl: './activitys.component.html',
  styleUrls: ['./activitys.component.scss']
})
export class ActivitysComponent implements OnInit {

  activitys = [
    
      { label: "Relaxing", description: "Taking time off to unwind and rejuvenate", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "green", points: 1, isHovered: false },
      { label: "E-mails", description: "Communicating and staying connected digitally", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "blue", points: 1, isHovered: false },
      { label: "Running", description: "Active exercise for cardiovascular health", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "red", points: 1, isHovered: false },
      { label: "Cleaning", description: "Tidying up and maintaining a neat environment", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "blue", points: 1, isHovered: false },
      { label: "Journaling", description: "Documenting thoughts, feelings, and experiences", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "green", points: 1, isHovered: false },
      { label: "Working", description: "Engaging in professional or personal tasks", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "blue", points: 1, isHovered: false },
      { label: "Partying", description: "Enjoying social gatherings and celebrations", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "green", points: 1, isHovered: false },
      { label: "Lifting", description: "Strength training and muscle building", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "red", points: 1, isHovered: false },
      { label: "Movie", description: "Watching films for entertainment or relaxation", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "green", points: 1, isHovered: false },
      { label: "Shopping", description: "Purchasing goods or simply browsing stores", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "blue", points: 1, isHovered: false },
      { label: "Dating", description: "Building connections and seeking relationships", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "green", points: 1, isHovered: false },
      { label: "Design", description: "Crafting visuals and creating aesthetics", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "blue", points: 1, isHovered: false },
      { label: "Meditating", description: "Seeking inner peace and mindfulness", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "green", points: 1, isHovered: false },
      { label: "Detoxing", description: "Cleansing body and mind from toxins", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "red", points: 1, isHovered: false },
      { label: "Journaling", description: "Expressing oneself through written words", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "green", points: 1, isHovered: false },
      { label: "Coding", description: "Building and troubleshooting software", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "blue", points: 1, isHovered: false }
  
  
  ];
  
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
    return `2px solid ${color}`; // You can adjust the border style as needed
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






