import { Component, OnInit,ViewChild } from '@angular/core';
import { DropzoneComponent } from 'ngx-dropzone-wrapper';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild("photoDropzone") photoDropzone: DropzoneComponent;
  payload:any = {
    username:'',
    password:'',
    photo:null
  };
  errorMsgs:any = {};

  constructor(private authService:AuthService,
              private router:Router) { }

  ngOnInit() {
  }

  signup(){
    this.errorMsgs = {};

    if (this.photoDropzone.directiveRef.dropzone().files) {
      this.payload.photo = this.photoDropzone.directiveRef.dropzone().files[0];
    }
    
    let fd = new FormData();
    fd.append("username",this.payload.username)
    fd.append("password",this.payload.password)
    fd.append("photo",this.payload.photo || "")

    this.authService.signup(fd).subscribe( (res:any) =>{
      this.authService.popSuccesToast(res.message);
      this.router.navigate(['/login']);
    },err =>{      
      if(err.error){
        this.authService.popErrorToast(err.error.message);
        Object.keys(err.error.errors).forEach(key =>{
          this.errorMsgs[key] = err.error.errors[key].message
        })
      }
    },()=>{
      this.photoDropzone.directiveRef.reset();
    })
  }

}
