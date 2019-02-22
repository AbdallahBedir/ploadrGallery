import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private appService:AppService,
              private router:Router){

  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {    
    return this.appService.getStats().pipe(map((res:any) =>{
      return res.data ? true : false
    }),catchError(err =>{
      if(err){
        this.router.navigate(['/login'])
        return Observable.throw(null)
      }
    }))
  }
}
