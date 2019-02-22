import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable , BehaviorSubject} from 'rxjs';
import { API } from '../utils/api';
import { ToasterService} from 'angular2-toaster';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
    
    updateSidebar:BehaviorSubject<boolean> = new BehaviorSubject(null);
    updateSidebar$:Observable<any> = this.updateSidebar.asObservable();

    updateUserInfo:BehaviorSubject<boolean> = new BehaviorSubject(null);
    updateUserInfo$:Observable<any> = this.updateUserInfo.asObservable();

    constructor(private http:HttpClient,
                private toasterService: ToasterService) {
  
    }

    listImages(filters){
      let params = new HttpParams();
      Object.keys(filters).forEach(key => {
        if(filters[key]){
          params = params.append(key,filters[key])
        }        
      })
      return this.http.get(API.images,{params:params})
    }

    getStats(){
      return this.http.get(API.stats)
    }

    getPopularImages(){
      return this.http.get(API.popularImages)
    }

    getLatestComments(){
      return this.http.get(API.latestComments)
    }
    
    getNewestImages(){
      return this.http.get(API.newestImages)
    }

    uploadImage(payload){
      return this.http.post(API.images,payload)
    }

    getImageDetails(imageId){
      return this.http.get(`${API.images}/${imageId}`)
    }

    editImage(imageId,payload){
      return this.http.put(`${API.images}/${imageId}/edit`,payload)
    }

    deleteImage(imageId){
      return this.http.delete(`${API.images}/${imageId}`)
    }    

    likeImage(imageId){
      return this.http.post(`${API.images}/${imageId}/like`,null)
    }

    postComment(imageId,payload){
      return this.http.post(`${API.images}/${imageId}/comment`,payload)
    }

    editComment(commentId,payload){
      return this.http.put(`${API.comments}/${commentId}/edit`,payload)
    }

    deleteComment(commentId){
      return this.http.delete(`${API.comments}/${commentId}/delete`)
    }    

    updateProfile(payload){
      return this.http.put(`${API.users}/me`,payload);
    }

    popSuccesToast(message) {
      this.toasterService.pop('success', 'Success', message);
    }
  
    popErrorToast(message) {
      this.toasterService.pop('error', 'Error', message);
    }
}
