import { Component, OnInit,ViewChild,ViewEncapsulation } from '@angular/core';
import { faUpload ,faSpinner} from '@fortawesome/free-solid-svg-icons';
import { AppService } from '../../services/app.service';
import { DropzoneComponent } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
  @ViewChild("photoDropzone") photoDropzone: DropzoneComponent;

  icons ={
    faUpload : faUpload,
    faSpinner :faSpinner,
  }
  
  image:Image = {
    avatar:null,
    title:null,
    description:null
  }
  newestImages:any[];
  errorMsgs:any = {};
  loading:boolean = false;
  successMsg:string;

  constructor(private appService:AppService) { }

  ngOnInit(){
    this.getNewestImages();
  }

  getNewestImages(){
    this.appService.getNewestImages().subscribe((res:any) =>{
      this.newestImages = res.data;
    })
  }

  validateUploadedFile(file:File){
    this.errorMsgs = {};
    if(!file.type.includes("image")){
      this.errorMsgs.avatar = "Only images is allowed";
      return false;
    }
    else if(file.size > 10000000){
      this.errorMsgs.avatar = "Image is too large, max file size is 10MB";
      return false;
    }
    return true;
  }

  uploadImage(){
    this.loading = true;
    this.successMsg = null;
    this.errorMsgs = {};

    let files = this.photoDropzone.directiveRef.dropzone().files;

    if (files && files.length) {
      let file = files[files.length -1];
      if(this.validateUploadedFile(file)){
        this.image.avatar = file;
      }      
    }

    if(!this.image.avatar){
      this.errorMsgs.avatar = "Image avatar is required";
      return;
    }

    let fd:FormData = new FormData();
    Object.keys(this.image).forEach(key =>{
      if(this.image[key]){
        fd.append(key,this.image[key])
      }
    })
    this.appService.uploadImage(fd).subscribe((res:any) =>{
      this.loading = false;
      if(res.success){
        this.successMsg = res.message;
        setTimeout(() => {
          this.successMsg = null;
          // reset avatar field
          this.photoDropzone.directiveRef.reset();
          this.image = {
            avatar:null,
            title:null,
            description:null
          }
          this.getNewestImages();
          this.appService.updateSidebar.next(true);
        }, 3000);
      }
    },err =>{
      this.loading = false;
      if(err.error && err.error.errors){
        this.errorMsgs = err.error.errors;
      }
    })
  }

}

interface Image {
  avatar:any;
  title:string;
  description:string
}
