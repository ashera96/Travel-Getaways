import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  constructor() { }

  ngOnInit() {
  }

  onRegister() {
    let password = this.registrationForm.controls.password.value;
    let confirmPassword = this.registrationForm.controls.confirmPassword.value;
    if (!this.registrationForm.valid || password != confirmPassword) {
      console.log("Invalid");
    } else {
      console.log(JSON.stringify(this.registrationForm.value));
    }
  }
}
