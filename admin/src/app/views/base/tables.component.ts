import { Component } from "@angular/core";
import { HttpService } from "../../http.service";
import { HttpEnum } from "../../utils/httpenum";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
//Users view
@Component({
  templateUrl: "tables.component.html"
})
export class TablesComponent {
  public Userlist = new Array();
  public Postlist = new Array();
  public returnedArray = new Array();
  public showLoader = false;
  public len = 0;
  itemsPerPage: number = 5;
  currentPage: number = 1;

  private getUserURL = HttpEnum.baseURL + "adminusers/GetUsers";
  private updateUserURL = HttpEnum.baseURL + "adminusers/UpdateUser";
  private sendMailUrl = HttpEnum.baseURL + "reply";
  //private BanUserURL = HttpEnum.baseURL + "deleteUser";

  constructor(
    private httpService: HttpService,
    private emailService: HttpService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    console.log("trying to get Users check tables.component.ts");

    this.getUsers();
  }
  getUsers() {
    console.log(this.getUserURL);
    this.showLoader = true;

    this.httpService
      .realizarHttpPost(this.getUserURL, null)
      .subscribe((results: any) => {
        if (results === null) {
          console.log("error getting results");
        } else {
          console.log(results);
          this.Userlist = results.results;
          for (let i = 0; i < results.length; i++) {
            this.Userlist.push(results.results[i]);
          }
          this.returnedArray = this.Userlist;
          this.len = this.Userlist.length;
          console.log(this.Userlist);
          this.showLoader = false;
        }
      });
  }

  pageChanged(event: any): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.Userlist.slice(startItem, endItem);
    console.log(this.returnedArray);
  }

  ChangeStatus(uname, status, _email) {
    console.log(uname);
    console.log(_email);
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
          console.log(results);
          if (results.status === null) {
            alert("server connection error");
          } else {
            alert("ban lifted on user");
            this.http
              .post(this.sendMailUrl, {
                email: _email,
                message: "User Account Control",
                reply: "Ban Lifted on User"
              })
              .subscribe(res => {
                console.log(res);
              });
          }
        });
    }
    if (status == "Active") {
      req.val = "ban";
      this.httpService
        .realizarHttpPost(this.updateUserURL, req)
        .subscribe((results: any) => {
          console.log(results);
          if (results.status === null) {
            alert("server connection error");
          } else {
            alert("ban affected on user");
            this.http
              .post(this.sendMailUrl, {
                email: _email,
                message: "User Account Control",
                reply: "User is Banned from the Platform"
              })
              .subscribe(res => {
                console.log(res);
              });
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
            this.http
              .post(this.sendMailUrl, {
                email: _email,
                message: "User Account Control",
                reply: "Welcome to TravelGateways You Account has been Accepted"
              })
              .subscribe(res => {
                console.log(res);
              });
          }
        });
    }
    this.getUsers();
  }
}
