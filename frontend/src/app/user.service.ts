import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  get loggedIn(): boolean {
    return !!this.jwt;
  }

  get jwt(): string {
    return localStorage.getItem('jwt') || '';
  }

  set jwt(token: string) {
    localStorage.setItem('jwt', token);
  }

  constructor() { }

  logout(): void {
    localStorage.removeItem('jwt');
  }
}
