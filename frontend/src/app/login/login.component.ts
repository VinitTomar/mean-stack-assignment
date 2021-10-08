import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
    private _service: LoginService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    this.submissionInProgress = true;
    this.subscription = this._service.login(form.value).subscribe(res => {
      console.log({ loginRes: res });

      this._router.navigateByUrl('/product');
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
