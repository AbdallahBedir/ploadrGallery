import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  images:any[]=[];
  filters:any = {
    q:'',
    owner:'',
    page:1
  }  
  loadMore:boolean = true;

  constructor(private appService:AppService) { }

  ngOnInit() {
    this.listImages();
  }

  listImages(){    
    this.appService.listImages(this.filters).subscribe( (res:any) => {
      this.images = Array.prototype.concat(this.images,res.data);
      this.loadMore = res.data.length  < 3 ? false : true ;
    })
  }

  resetPaginator(){
    this.images = [];
    this.filters.page = 1;
    this.listImages();
  }

}
