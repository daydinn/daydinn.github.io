import { Component } from '@angular/core';
import { Activity} from '../activityInterface';
@Component({
  selector: 'app-activitys',
  templateUrl: './activitys.component.html',
  styleUrls: ['./activitys.component.scss']
})
export class ActivitysComponent {

  activitys = [
    { label: "Meditation", description: "A relaxing activity", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "blue", points: 1, isHovered: false },
    { label: "Running", description: "A fitness activity", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "red", points: 1, isHovered: false },
    { label: "Walking", description: "A leisurely stroll", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "blue", points: 1, isHovered: false },
    { label: "Walking", description: "A refreshing walk in nature", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "green", points: 1, isHovered: false },
    { label: "Meditation", description: "An opportunity for inner reflection", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "blue", points: 1, isHovered: false },
    { label: "Running", description: "Active running for fitness", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "red", points: 1, isHovered: false },
    { label: "Walking", description: "Walking to relax", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "green", points: 1, isHovered: false },
    { label: "Walking", description: "Casual outdoor walking", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "blue", points: 1, isHovered: false },
    { label: "Meditation", description: "Meditation for inner peace", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "red", points: 1, isHovered: false },
    { label: "Running", description: "Active running for fitness", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "blue", points: 1, isHovered: false },
    { label: "Walking", description: "Strolling in the park", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "green", points: 1, isHovered: false },
    { label: "Walking", description: "Casual walk", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "blue", points: 1, isHovered: false },
    { label: "Meditation", description: "Relaxation through meditation", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "blue", points: 1, isHovered: false },
    { label: "Running", description: "Active running for fitness", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "red", points: 1, isHovered: false },
    { label: "Walking", description: "Casual outdoor walking", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "blue", points: 1, isHovered: false },
    { label: "Walking", description: "Walking in the greenery", img: "/assets/family32.png", hoveredImg: "/assets/family32_hover.png", color: "green", points: 1, isHovered: false }
  ];
  
  showInfoWindow = false;
  selectedActivity: any;

  getBorderStyle(color: string): string {
    return `3px solid ${color}`; // You can adjust the border style as needed
  }

  toggleHover(activity: any) {
    activity.isHovered = !activity.isHovered;
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

}
