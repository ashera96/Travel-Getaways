import { Component } from "@angular/core";
import { HttpService } from "../../http.service";
import { HttpEnum } from "../../utils/httpenum";

//Users view
@Component({
  templateUrl: "tables.component.html"
})
export class TablesComponent {
  Userlist = new Array();

  private getUserURL = HttpEnum.baseURL + "/GetUsers";
  private updateUserURL = HttpEnum.baseURL + "/UpdateUser";
  private BanUserURL = HttpEnum.baseURL + "/deleteUser";
  private getPostsURL = HttpEnum.baseURL + "getPosts";
  private deletePosts = HttpEnum.baseURL + "deletePosts";

  constructor(private httpService: HttpService) {}
  ngOnInit(): void {
    console.log("trying to get posts");

    //this.getPosts();
  }
  getPosts() {
    this.httpService
      .realizarHttpPost(this.getUserURL, null)
      .subscribe(results => {
        if (results === null) {
          console.log("error getting results");
        } else {
          console.log(results);
        }
      });
  }
}
