import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required)
  })
  constructor(private authService: AuthService,
              private router: Router,
              private ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {
  }

  onLogin() {
    if (!this.loginForm.valid) {
      console.log('Invalid');
      this.ngFlashMessageService.showFlashMessage({
        messages: ["Login Failed! Please try again"], 
        type: 'danger'
      });
    } else {
      this.authService.authenticateUser(JSON.stringify(this.loginForm.value))
        .subscribe(
          (data: any) => {
            this.authService.storeUserData(data.token, data.user);
            console.log('Successfully logged in!');
            this.router.navigate(['/home']);
          },
          error => {
            console.log("Invalid");
            this.ngFlashMessageService.showFlashMessage({
              messages: ["Registration Failed! Please try again"], 
              type: 'danger'
            });  
          }
        );
      // console.log(JSON.stringify(this.loginForm.value));
    }
  }
}