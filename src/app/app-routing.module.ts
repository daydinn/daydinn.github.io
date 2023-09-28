import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoodsComponent } from './moods/moods.component';
import { ActivitysComponent } from './activitys/activitys.component';
import { UserProgressComponent } from './user-progress/user-progress.component';
import { StartpageComponent } from './startpage/startpage.component';
import { HashLocationStrategy,LocationStrategy } from '@angular/common';

const routes: Routes = [
  { path: '', component: StartpageComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'moods', component: MoodsComponent },
  { path: 'activitys', component: ActivitysComponent },
  { path: 'progression', component: UserProgressComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], // Hinweis auf { useHash: true }  
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule {}
