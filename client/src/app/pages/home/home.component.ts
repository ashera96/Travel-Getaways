import { Component, OnInit } from "@angular/core";
import { HttpEnum } from "src/utils/httpEnum";
import { HttpService } from "../../http.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  public analyticsUrl = HttpEnum.baseURL + "pageviews/addView";
  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.realizarHttpPost(this.analyticsUrl, {}).subscribe(res => {
      console.log(res);
    });
    console.log(this.analyticsUrl);
    console.log("page view detected");
  }
}
