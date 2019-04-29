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

  private getUserURL = HttpEnum.baseURL + "GetUsers";
  private updateUserURL = HttpEnum.baseURL + "UpdateUser";
  private BanUserURL = HttpEnum.baseURL + "deleteUser";
  private getPostsURL = HttpEnum.baseURL + "GetPosts";
  private deletePosts = HttpEnum.baseURL + "deletePosts";

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

  ChangeStatus(id, status) {
    console.log(id);
    var action = "undefined";
    let req = {
      val: action,
      id: id
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
