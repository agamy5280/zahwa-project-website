import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || '';
  
  constructor(private _router: Router, protected localStorageService: LocalstorageService) {}
  logout() {
    localStorage.removeItem('loggedUser')
    this._router.navigate(['home']).then(() => {
      window.location.reload();
    });
    localStorage.removeItem('cartProducts')
  }
  goToCategoriesProducts(category: string){
    this._router.navigate(['products'], {
      queryParams: {
        category: category,
      },
    });
  }
}
