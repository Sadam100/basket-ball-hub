import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {WebServiceService} from './web-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private web: WebServiceService, public router: Router) { }

  canActivate(): boolean {
    // if (!this.auth.isAuthenticated()) {
    //   this.router.navigate(['signin']);
    //   return false;
    // }
    if (this.web.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['signin']);
    }
    // return true;
  }
}
