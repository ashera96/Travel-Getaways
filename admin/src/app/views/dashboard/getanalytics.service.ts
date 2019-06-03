import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { resolve } from "dns";

@Injectable({
  providedIn: "root"
})
export class GetanalyticsService {
  public analyticsUrl: string = "http://localhost:3000/pageviews/Get_Analytics";
  public data: Array<number> = [];
  constructor(private http: HttpClient, private router: Router) {}
  async getChartData(bodyObject: Object) {
    if (localStorage.getItem("token")) {
      // const headers = new HttpHeaders();
      // headers.append("token", localStorage.getItem("token"));

      await new Promise(resolve => {
        this.http
          .post(this.analyticsUrl, {
            bodyObject,
            params: new HttpParams().append(
              "token",
              localStorage.getItem("token")
            )
          })
          .subscribe(res => {
            //console.log(res);
            this.data = res["result"];
            res["result"].array.forEach(element => this.data.push(element));
            //console.log(this.data);
            console.log(this.data);
            resolve();
          });
      }).then(val => {
        return this.data;
      });

      console.log("line 33 get");
      console.log(this.data);
      // var analytics: any = data.result;
      //console.log(data);
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
