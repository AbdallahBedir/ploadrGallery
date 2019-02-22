import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { ImagesComponent } from './components/images/images.component';
import { ImageDetailsComponent } from './components/image-details/image-details.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DefaultComponent } from './components/default/default.component';
import { AuthGuard } from './services/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path:"login" ,component:LoginComponent},
  { path:"signup" ,component:SignupComponent},
  { path:"",component:DefaultComponent,canActivate:[AuthGuard],
    children:[
      { path:"" ,component:IndexComponent},
      { path:"images",component:ImagesComponent},
      { path:"images/:id" ,component:ImageDetailsComponent},
      { path:"profile",component:ProfileComponent},
    ]
  },
  { path:"**" ,redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
