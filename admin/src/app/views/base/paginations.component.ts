import { Component, Input, ViewEncapsulation } from "@angular/core";
import { HttpEnum } from "../../utils/httpenum";
import { HttpService } from "../../http.service";

@Component({
  templateUrl: "paginations.component.html",
  styles: [".pager li.btn:active { box-shadow: none; } "],
  encapsulation: ViewEncapsulation.None
})
export class PaginationsComponent {
  private getPostsURL = HttpEnum.baseURL + "adminposts/GetPosts";
  private deletePosts = HttpEnum.baseURL + "adminposts/deletePosts";
  public postslist = new Array();
  public returnedArray = new Array();
  public showLoader = false;
  itemsPerPage: number = 1;
  currentPage: number = 1;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.GetPosts();
  }

  GetPosts() {
    this.showLoader = true;
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
          this.showLoader = false;
        }
      });
  }

  pageChanged(event: any): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.postslist.slice(startItem, endItem);
    console.log(this.returnedArray);
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
