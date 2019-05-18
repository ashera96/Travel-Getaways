import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

import { AuthService } from 'src/app/services/auth/auth.service';

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
  constructor(private authService: AuthService,
              private router: Router,
              private ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {
  }

  onRegister() {
    let password = this.registrationForm.controls.password.value;
    let confirmPassword = this.registrationForm.controls.confirmPassword.value;
    if (!this.registrationForm.valid || password != confirmPassword) {
      console.log("Invalid");
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Registration Failed! Please try again"], 
        // dismissible: true, 
        // timeout: false,
        type: 'danger'
      });
    } else {
      this.authService.registerUser(JSON.stringify(this.registrationForm.value))
        .subscribe(
          (data: any) => {
            console.log('Registration successful. Please log in');
            this.ngFlashMessageService.showFlashMessage({
              messages: ["Registration successful. Please log in"], 
              type: 'success'
            });
            this.router.navigate(['/login']);
          },
          (error: any) => {
            console.log("Invalid");
            this.ngFlashMessageService.showFlashMessage({
              messages: ["Registration Failed! Please try again"], 
              type: 'danger'
            });
          }
        );
      // console.log(JSON.stringify(this.registrationForm.value));
    }
  }
}
