import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  submissionInProgress = false;
  subscription!: Subscription;

  constructor(
    private _loginService: LoginService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (this._userService.loggedIn) {
      this._router.navigateByUrl('/product');
    }
  }

  submit(form: NgForm): void {
    if (!form.valid) {
      form.control.markAllAsTouched();
      return;
    }

    this.submissionInProgress = true;
    this.subscription = this._loginService.login(form.value).subscribe(res => {
      this._userService.jwt = res.token;
      this._router.navigateByUrl('/product');
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
