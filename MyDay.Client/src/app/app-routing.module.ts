import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './components/explore/explore.component';
import { JournalsComponent } from './components/journals/journals.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SupportComponent } from './components/support/support.component';

const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent, 
    pathMatch: 'full'
  },
  {
    path: "explore", component: ExploreComponent
  },
  {
    path: "journals", component: JournalsComponent
  },
  {
    path: "support", component: SupportComponent
  }
  ,
  {
    path: "profile", component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
