import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './components/explore/explore.component';
import { JournalsComponent } from './components/journals/journals.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SupportComponent } from './components/support/support.component';
import { AuthGuard } from './_guards/auth.guard';

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
  },
  {
    path: "signIn", component: SignInComponent
  },
  {
    path: "signUp", component: SignUpComponent
  },
  {
    path: "profile", 
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
