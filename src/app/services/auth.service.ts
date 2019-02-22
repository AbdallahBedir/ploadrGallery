import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { API } from '../utils/api';
import { ToasterService} from 'angular2-toaster';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http:HttpClient,
              private toasterService: ToasterService) { }

  signup(payload){
    return this.http.post(API.auth.signup,payload)
  }

  login(payload){
    return this.http.post(API.auth.login,payload)
  }
  
  popSuccesToast(message) {
    this.toasterService.pop('success', 'Success', message);
  }

  popErrorToast(message) {
    this.toasterService.pop('error', 'Error', message);
  }
}
