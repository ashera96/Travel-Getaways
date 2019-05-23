import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { admin_login_model } from "./admin.login.model";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { HttpService } from "../../http.service";
import { log } from "util";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html"
})
export class LoginComponent {
  public username = new FormControl(this.username, [Validators.required]);
  public password = new FormControl(this.password, [Validators.required]);

  constructor(private router: Router) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  login() {
    console.log("====================================");
    console.log(this.username.value);
    console.log(this.password.value);

    console.log("====================================");
  }

  route_to_register() {
    this.router.navigate(["/register"]);
  }
}
