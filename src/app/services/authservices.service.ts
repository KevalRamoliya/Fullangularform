import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {
  private isAuthenticatedKey = "isAuthenticated"

  login() {
    localStorage.setItem(this.isAuthenticatedKey, 'true')
  }

  logout() {
    localStorage.removeItem(this.isAuthenticatedKey);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.isAuthenticatedKey) === 'true'
  }

}
