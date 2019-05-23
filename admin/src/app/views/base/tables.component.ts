import { Component } from "@angular/core";
import { HttpService } from "../../http.service";
import { HttpEnum } from "../../utils/httpenum";

//Users view
@Component({
  templateUrl: "tables.component.html"
})
export class TablesComponent {
  public Userlist = new Array();
  public Postlist = new Array();

  private getUserURL = HttpEnum.baseURL + "adminusers/GetUsers";
  private updateUserURL = HttpEnum.baseURL + "adminusers/UpdateUser";
  //private BanUserURL = HttpEnum.baseURL + "deleteUser";

  constructor(private httpService: HttpService) {}
  ngOnInit(): void {
    console.log("trying to get Users check tables.component.ts");

    this.getPosts();
  }
  getPosts() {
    console.log(this.getUserURL);

    this.httpService
      .realizarHttpPost(this.getUserURL, null)
      .subscribe((results: any) => {
        if (results === null) {
          console.log("error getting results");
        } else {
          console.log(results);
          for (let i = 0; i < results.length; i++) {
            this.Userlist.push(results[i]);
          }
          console.log(this.Userlist);
        }
      });
  }

  ChangeStatus(uname, status) {
    console.log(uname);
    var action = "undefined";
    let req = {
      val: action,
      id: uname
    };
    if (status == "Banned") {
      req.val = "unban";
      this.httpService
        .realizarHttpPost(this.updateUserURL, req)
        .subscribe((results: any) => {
          if (results.status === null) {
            alert("server connection error");
          } else {
            alert("ban lifted on user");
          }
        });
    }
    if (status == "Active") {
      req.val = "ban";
      this.httpService
        .realizarHttpPost(this.updateUserURL, req)
        .subscribe((results: any) => {
          if (results.status === null) {
            alert("server connection error");
          } else {
            alert("ban affected on user");
          }
        });
    }
    if (status == "Pending") {
      req.val = "accept";
      this.httpService
        .realizarHttpPost(this.updateUserURL, req)
        .subscribe((results: any) => {
          if (results.status === null) {
            alert("server connection error");
          } else {
            alert("User account accepted");
          }
        });
    }
  }
}
