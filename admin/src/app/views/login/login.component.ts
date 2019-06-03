import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { admin_login_model } from "./admin.login.model";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { HttpService } from "../../http.service";
import { log } from "util";
import { RegisterServiceService } from "../../register-service.service";
import { MatFormFieldControl } from "@angular/material";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html"
})
export class LoginComponent {
  loginForm: FormGroup;
  public username = "";
  public password = "";

  constructor(
    private router: Router,
    private _myservice: RegisterServiceService
  ) {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }
  isValid(controlName) {
    return (
      this.loginForm.get(controlName).invalid &&
      this.loginForm.get(controlName).touched
    );
  }

  login() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this._myservice.login(this.loginForm.value).subscribe(
        data => {
          console.log(data);
          localStorage.setItem("token", data.toString());
          this.router.navigate(["/dashboard"]);
        },
        error => {}
      );
    }
  }

  route_to_register() {
    this.router.navigate(["/register"]);
  }
}
