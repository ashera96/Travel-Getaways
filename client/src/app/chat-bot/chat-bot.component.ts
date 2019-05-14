import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { element } from "@angular/core/src/render3";
import { FormControl, Validators } from "@angular/forms";
import { HttpService } from "../http.service";

@Component({
  selector: "app-chat-bot",
  templateUrl: "./chat-bot.component.html",
  styleUrls: ["./chat-bot.component.css"]
})
export class ChatBotComponent implements OnInit {
  public toggle: boolean = false;
  @ViewChild("pagecontainer") pagecontainerelement: ElementRef;
  public pagecontainer: HTMLElement;
  public input = new FormControl("", [Validators.required]);
  public chatList = new Array();

  constructor(private httpService: HttpService) {}

  ngOnInit() {}

  ToggleChat() {
    console.log("toggle called");

    if (this.toggle) {
      this.toggle = false;
      this.pagecontainer = <HTMLElement>this.pagecontainerelement.nativeElement;
      this.pagecontainer.classList.toggle("hide");
      //console.log("hide");
    } else {
      this.toggle = true;
      //console.log("hide");

      this.pagecontainer = <HTMLElement>this.pagecontainerelement.nativeElement;
      this.pagecontainer.classList.toggle("expand");
    }
  }

  getReply() {
    let sendObj = {
      id: "user",
      val: this.input.value
    };
    this.chatList.push(sendObj);
    this.httpService.realizarHttpPost("URL", sendObj).subscribe(res => {
      let resObj = { id: "bot", val: res };
      this.chatList.push(resObj);
    });
  }
}
