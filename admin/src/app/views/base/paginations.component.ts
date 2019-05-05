import { Component, Input, ViewEncapsulation } from "@angular/core";
import { HttpEnum } from "../../utils/httpenum";
import { HttpService } from "../../http.service";

@Component({
  templateUrl: "paginations.component.html",
  styles: [".pager li.btn:active { box-shadow: none; }"],
  encapsulation: ViewEncapsulation.None
})
export class PaginationsComponent {
  private getPostsURL = HttpEnum.baseURL + "GetPosts";
  private deletePosts = HttpEnum.baseURL + "deletePosts";
  public postslist = new Array();

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.GetPosts();
  }

  GetPosts() {
    this.httpService
      .realizarHttpPost(this.getPostsURL, null)
      .subscribe((results: any) => {
        if (results === null) {
          console.log("error getting results");
        } else {
          console.log(results);
          for (let i = 0; i < results.length; i++) {
            this.postslist.push(results[i]);
          }
          console.log(this.postslist);
        }
      });
  }
  DeletePosts(title) {
    console.log(title);
    this.httpService
      .realizarHttpPost(this.deletePosts, { val: title })
      .subscribe((results: any) => {
        if (results === null) {
          console.log("error occured");
        } else {
          console.log("results");
          this.GetPosts();
        }
      });
  }
}
