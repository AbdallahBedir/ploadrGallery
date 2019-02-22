import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  stats:any[];
  popularImages:any[];
  latestComments:any[];
  
  constructor(private appService:AppService) { 
    this.appService.updateSidebar$.subscribe(response =>{
      if(response){
        this.updateSidebarInfo();
      }
    })
  }

  ngOnInit() {
    this.updateSidebarInfo();
  }

  updateSidebarInfo(){
    this.appService.getStats().subscribe((res:any) =>{
      this.stats = res.data;
    })
    this.appService.getPopularImages().subscribe((res:any) =>{
      this.popularImages = res.data;
    })
    this.appService.getLatestComments().subscribe((res:any) =>{
      this.latestComments = res.data;
    })
  }

}
