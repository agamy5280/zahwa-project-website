import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailNotFound:boolean = false;
constructor(private usersService:UsersService) {}
loginForm = new FormGroup({
  email: new FormControl('', [Validators.required]),
  password: new FormControl('', [Validators.required])
})
login() {
  this.usersService.login(this.loginForm.value);
  if(this.usersService.emailNotFound) {
    this.emailNotFound = true;
  }
}
}
