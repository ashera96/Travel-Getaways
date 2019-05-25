import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl
} from "@angular/forms";
import { forbiddenNameValidator } from "../../utils/regx_validators";
import { RegisterServiceService } from "../../register-service.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "register.component.html"
})
export class RegisterComponent {
  registerFrom: FormGroup;
  public successmessage = "";

  constructor(
    private router: Router,
    private _myservice: RegisterServiceService
  ) {
    this.registerFrom = new FormGroup({
      email: new FormControl(null, Validators.email),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      cnfpass: new FormControl(null, this.passValidator)
    });

    this.registerFrom.controls.password.valueChanges.subscribe(x =>
      this.registerFrom.controls.cnfpass.updateValueAndValidity()
    );
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  isValid(controlName) {
    return (
      this.registerFrom.get(controlName).invalid &&
      this.registerFrom.get(controlName).touched
    );
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;

      const passControl = control.root.get("password");
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === "") {
          return {
            isError: true
          };
        }
      }
    }

    return null;
  }

  register() {
    console.log(this.registerFrom.value);

    if (this.registerFrom.valid) {
      this._myservice
        .submitRegister(this.registerFrom.value)
        .subscribe(
          data => (this.successmessage = "Registration Success"),
          error => (this.successmessage = "SOme error")
        );
    }
  }

  route_to_login() {
    this.router.navigate(["/login"]);
  }
}
