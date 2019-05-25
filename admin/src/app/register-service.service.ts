import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class RegisterServiceService {
  constructor(private _http: HttpClient) {}

  submitRegister(body: any) {
    return this._http.post("http://localhost:3000/adminusers/register", body, {
      observe: "body"
    });
  }

  login(body: any) {
    return this._http.post("http://localhost:3000/adminusers/login", body, {
      observe: "body"
    });
  }

  getUserName() {
    return this._http.get("http://localhost:3000/adminusers/username", {
      observe: "body",
      params: new HttpParams().append("token", localStorage.getItem("token"))
    });
  }
}
