import { Injectable } from "@angular/core";
//import { Routes, RouterModule } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient, private router: Router) {}

  realizarHttpPost(requestType: string, bodyObject: Object) {
    if (localStorage.getItem("token")) {
      // const headers = new HttpHeaders();
      // headers.append("token", localStorage.getItem("token"));
      return this.http.post(requestType, {
        bodyObject,
        params: new HttpParams().append("token", localStorage.getItem("token"))
      });
    } else {
      this.router.navigate(["/login"]);
    }
  }
  getChartData(requestType: string, bodyObject: Object) {
    if (localStorage.getItem("token")) {
      // const headers = new HttpHeaders();
      // headers.append("token", localStorage.getItem("token"));
      return this.http.post(requestType, {
        bodyObject,
        params: new HttpParams().append("token", localStorage.getItem("token"))
      });
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
