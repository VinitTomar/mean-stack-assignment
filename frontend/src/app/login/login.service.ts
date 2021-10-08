import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from './login.model';
import { TokenResponse } from './token.respones';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  login(credentials: LoginModel): Observable<TokenResponse> {
    return this._httpClient.post<TokenResponse>('login', credentials);
  }
}
