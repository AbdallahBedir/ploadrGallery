import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropzoneModule,DROPZONE_CONFIG,DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ToasterModule } from 'angular2-toaster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// services 
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { IndexComponent } from './components/index/index.component';
import { TokenInterceptor } from './services/token.interceptor';

// pipes
import { TimeAgoPipe } from 'time-ago-pipe';
// components
import { ImageDetailsComponent } from './components/image-details/image-details.component';
import { ImagesComponent } from './components/images/images.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DefaultComponent } from './components/default/default.component';
import { ProfileComponent } from './components/profile/profile.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
   url: 'http://localhost:3000/api/',
   acceptedFiles: 'image/*',
   maxFilesize: 20,
   autoProcessQueue: false,
   addRemoveLinks: true,
   dictRemoveFile: 'x'
 };

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    IndexComponent,
    TimeAgoPipe,
    ImageDetailsComponent,
    ImagesComponent,
    LoginComponent,
    SignupComponent,
    DefaultComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    DropzoneModule,
    ToasterModule.forRoot(),
    InfiniteScrollModule
  ],
  providers: [AppService,AuthService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
