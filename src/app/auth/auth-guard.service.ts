import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const email = localStorage.getItem('email');

    if (next.data['roles'].indexOf('admin') > -1 && email === 'admin@gmail.com') {
      return true;
    }

    if (next.data['roles'].indexOf('volunteer') > -1 && email && email !== 'admin@gmail.com') {
      return true;
    }
    return false;
  }

}
