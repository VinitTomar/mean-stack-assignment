import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  get showLogoutBtn(): boolean {
    return this._userService.loggedIn;
  }

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }

  logout(): void {
    this._userService.logout();
    this._router.navigateByUrl('/login');
  }
}
