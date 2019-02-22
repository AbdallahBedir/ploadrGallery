import { Component, OnInit } from '@angular/core';
import { Router , NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  title = 'ImgPloadr.io';
  user:any = JSON.parse(localStorage.getItem("user"));
  showSidebar:boolean = true;
  hiddenSidebarRoutes:string[] = [
    "/images",
    "/login",
    "/profile"
  ];

  constructor(private router:Router,
              private appService:AppService){
                
    this.router.events.pipe(
      filter(r => r instanceof NavigationEnd)
    ).subscribe((route:NavigationEnd)=>{      
      if(this.hiddenSidebarRoutes.indexOf(route.url) != -1) this.showSidebar = false;
      else{this.showSidebar = true}
    })
  }

  ngOnInit(){
    this.appService.updateUserInfo$.subscribe(user =>{
      if(user){
        this.user = user;
      }
    })
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

}
