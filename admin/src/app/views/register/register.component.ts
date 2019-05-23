import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { forbiddenNameValidator } from "../../utils/regx_validators";

@Component({
  selector: "app-dashboard",
  templateUrl: "register.component.html"
})
export class RegisterComponent {
  public username = new FormControl(this.username, [Validators.required]);
  public email = new FormControl(this.email, [
    Validators.required,
    Validators.email
  ]);
  public pwd = new FormControl(this.pwd, [
    Validators.required,
    Validators.minLength(8)
  ]);
  public repwd = new FormControl(this.repwd, [
    Validators.required,
    Validators.minLength(8)
  ]);

  constructor(private router: Router) {}

  register() {
    console.log("====================================");
    console.log(this.email.value);
    console.log("====================================");
  }

  route_to_login() {
    this.router.navigate(["/login"]);
  }
}
