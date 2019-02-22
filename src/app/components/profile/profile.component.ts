import { Component, OnInit,ViewChild } from '@angular/core';
import { DropzoneComponent } from 'ngx-dropzone-wrapper';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';
import { retryWhen } from 'rxjs/operators';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild("photoDropzone") photoDropzone: DropzoneComponent;
  payload:any = {
    username:'',
    password:'',
    confirm_password:'',
    photo:null
  };
  errorMsgs:any = {};
  user = JSON.parse(localStorage.getItem("user"));

  constructor(private appService:AppService,
              private router:Router) { }

  ngOnInit() {
    this.payload.username = this.user.username;
    if(this.user.photo){
      this.initializeUserPhoto(this.user.username, this.user.photo)
    }    
  }

  initializeUserPhoto(name, photoUrl) {
    setTimeout(() => {
        // Create the mock file:
        var mockFile = { name: name, size: 12345, accepted: true, kind: 'image' };
        // Call the default addedfile event handler
        this.photoDropzone.directiveRef.dropzone().emit("addedfile", mockFile);
        this.photoDropzone.directiveRef.dropzone().emit("thumbnail", mockFile, photoUrl);
        this.photoDropzone.directiveRef.dropzone().emit("complete", mockFile);
    }, 1000);
}

  updateProfile(){
    if(this.payload.password != this.payload.confirm_password){
      this.errorMsgs.confirm_password = "Password & Confirm password don't match";
      return;
    }
    this.errorMsgs = {};

    if (this.photoDropzone.directiveRef.dropzone().files) {
        this.payload.photo = this.photoDropzone.directiveRef.dropzone().files[0];
    }

    let fd = new FormData();
    fd.append("username",this.payload.username)
    if(this.payload.password){
      fd.append("password",this.payload.password)
    }
    if(this.payload.photo){
      fd.append("photo",this.payload.photo)
    }

    this.appService.updateProfile(fd).subscribe( (res:any) =>{
      this.appService.popSuccesToast(res.message);
      this.router.navigate(['/']);
      if(res.user){
        localStorage.setItem("user",JSON.stringify(res.user));
        this.appService.updateUserInfo.next(res.user)
      }
    },err =>{            
      if(err && err.error && err.error.errors){
        this.appService.popErrorToast(err.error.message);
        Object.keys(err.error.errors).forEach(key =>{
        this.errorMsgs[key] = err.error.errors[key].message
        })
      }
    },()=>{
      this.photoDropzone.directiveRef.reset();
    })
  }

  

}
