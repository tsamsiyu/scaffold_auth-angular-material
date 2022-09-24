import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

const TOKEN_KEY = 'authToken'

@Injectable({
  providedIn: 'root'
})
export class AuthTokenManagerService {

  constructor() { }

  hasToken(): boolean {
    const token = sessionStorage.getItem(TOKEN_KEY)
    return token != null && token != "";
  }

  saveToken(t: string): void {
    sessionStorage.setItem(TOKEN_KEY, t)
  }

  dropToken() {
    sessionStorage.removeItem(TOKEN_KEY)
  }
}

@Injectable()
export class CanActivateGuest implements CanActivate {

  constructor(private readonly authTokenManager: AuthTokenManagerService,
    private readonly router: Router,
    ) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.authTokenManager.hasToken()) {
      return true;
    }

    this.router.navigate(['saved-searches']);
    return false;
    }
}

@Injectable()
export class CanActivateUser implements CanActivate {

  constructor(
    private readonly authTokenManager: AuthTokenManagerService,
    private readonly router: Router,
  ) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authTokenManager.hasToken()) {
      return true
    }

    this.router.navigate(['/sign-in']);
    return false;
  }

}