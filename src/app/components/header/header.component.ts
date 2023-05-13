import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || '';
  
  constructor(private _router: Router) {}
  logout() {
    localStorage.removeItem('loggedUser')
    this._router.navigate(['home']).then(() => {
      window.location.reload();
    });
  }
}
