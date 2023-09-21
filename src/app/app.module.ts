import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { MoodsComponent } from './moods/moods.component';
import { ActivitysComponent } from './activitys/activitys.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScoresComponent } from './scores/scores.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProgressComponent } from './user-progress/user-progress.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MeditationsexerciseComponent } from './meditationsexercise/meditationsexercise.component';
import { StartpageComponent } from './startpage/startpage.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MoodsComponent,
    ActivitysComponent,
    ScoresComponent,
    TodoListComponent,
    UserProgressComponent,
    MeditationsexerciseComponent,
    StartpageComponent,
    
   
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
