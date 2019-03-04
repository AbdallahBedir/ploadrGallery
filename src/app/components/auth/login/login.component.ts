import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  payload:any = {
    username:'',
    password:''    
  };
  errorMsgs:any = {};

  constructor(private authService:AuthService,
              private router:Router) { }

  ngOnInit() {
  }

  login(){
    this.errorMsgs = {};
  
    this.authService.login(this.payload).subscribe( (res:any) =>{
      this.router.navigate(['/']);
      if(res.token){
        localStorage.setItem("token",res.token);
      }
      if(res.user){
        localStorage.setItem("user",JSON.stringify(res.user));
      }
    },err =>{      
      if(err.error){
        this.authService.popErrorToast(err.error.message);
        if(err.error.errors){
          Object.keys(err.error.errors).forEach(key =>{
            this.errorMsgs[key] = err.error.errors[key].message
          })
        }
      }
    })
  }

}
