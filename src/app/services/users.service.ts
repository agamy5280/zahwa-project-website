import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  emailUsed: boolean = false;
  emailNotFound: boolean = false;
  constructor(private _router: Router) { }
  getProductsFromLocalStorage() {
    if(!localStorage.getItem('cartProducts')){
      localStorage.setItem('cartProducts', '[]')
    }
    return JSON.parse(localStorage.getItem('cartProducts') || '[]')
  }
  getUsersFromLocalStorage() {
    if(!localStorage.getItem('users')){
      localStorage.setItem('users', '[]')
    }
    return JSON.parse(localStorage.getItem('users') || '[]')
  }
  getLoggedUserFromLocalStorage() {
    if(!localStorage.getItem('loggedUser')){
      localStorage.setItem('loggedUser', '[]')
    }
    return JSON.parse(localStorage.getItem('loggedUser') || '[]')
  }
  register(newUser: any) {
    let users = this.getUsersFromLocalStorage();
    if(users.length === 0) {
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users));
      this._router.navigate(['home']).then(() => {
        window.location.reload()
      })
    } else {
      for(let i = 0; i < users.length; i++) {
        if(users[i].email === newUser.email) {
          this.emailUsed = true;
        } else {
          users.push(newUser)
          localStorage.setItem('users', JSON.stringify(users));
          this._router.navigate(['home']).then(() => {
            window.location.reload()
          })
        }
      }
    }
  }
  login(userData: any) {
    let users = this.getUsersFromLocalStorage();
    let LoggedUser = this.getLoggedUserFromLocalStorage();
    if(users.length === 0) {
      this.emailNotFound = true;
    } else {
      for(let i = 0; i < users.length; i++) {
        if(users[i].email === userData.email && users[i].password === userData.password) {
          this._router.navigate(['home']).then(() => {
            window.location.reload()
          })
          LoggedUser.push(users[i])
          localStorage.setItem('loggedUser', JSON.stringify(LoggedUser));
        } else {
          this.emailNotFound = true;
        }
      }
    }
  }
}
