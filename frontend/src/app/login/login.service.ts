import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  login(credentials: LoginModel): Observable<any> {
    return this._httpClient.post('login', credentials);
  }
}
