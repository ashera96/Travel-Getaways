import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/auth/user.service';
import { error } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, [Validators.required])
  })
  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegister() {
    let password = this.registrationForm.controls.password.value;
    let confirmPassword = this.registrationForm.controls.confirmPassword.value;
    if (!this.registrationForm.valid || password != confirmPassword) {
      console.log("Invalid");
    } else {
      this.userService.signupUser(JSON.stringify(this.registrationForm.value))
        .subscribe(
          (data) =>  {
            console.log(data);
            this.router.navigate(['/home']);
          },
          (error) => {
            console.error(error);
          }
        );
      // console.log(JSON.stringify(this.registrationForm.value));
    }
  }
}
