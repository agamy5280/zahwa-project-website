import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  emailUsed:boolean = false;
  constructor(private usersService:UsersService) {}
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]+')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]+')]),
    mobileNum: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]+')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  register() {
    this.usersService.register(this.registerForm.value);
    if(this.usersService.emailUsed) {
      this.emailUsed = true;
    }
  }
}
