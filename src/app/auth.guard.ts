import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router,private cookieService: CookieService) {
    
  }
  canActivate() {
    {  
    //   var userDataCookie = this.cookieService.get('userData') 
    // console.log(userDataCookie)
  //   const userData = JSON.parse(userDataCookie);
  //  const patientId = userData[0];
      const verify=localStorage.getItem("user_name")
    
  //    console.log(patientId)
      console.log(verify)
  // if(patientId){
  //       return true
  //      }
  //      else
        if(verify){
       // console.log("first")
         return true
     
     }
     
     else{
      //  window.alert("plzz log in")
       this.router.navigate(['login'],)}
       return false
       
     }
     }
  }
  
// }
