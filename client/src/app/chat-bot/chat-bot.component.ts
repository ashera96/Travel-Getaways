import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { element } from "@angular/core/src/render3";

@Component({
  selector: "app-chat-bot",
  templateUrl: "./chat-bot.component.html",
  styleUrls: ["./chat-bot.component.css"]
})
export class ChatBotComponent implements OnInit {
  public toggle: boolean = false;
  @ViewChild("pagecontainer") pagecontainerelement: ElementRef;
  public pagecontainer: HTMLElement;

  constructor() {}

  ngOnInit() {}

  ToggleChat() {
    console.log("toggle called");

    if (this.toggle) {
      this.toggle = false;
      this.pagecontainer = <HTMLElement>this.pagecontainerelement.nativeElement;
      this.pagecontainer.classList.toggle("hide");
      console.log("hide");
    } else {
      this.toggle = true;
      console.log("hide");

      this.pagecontainer = <HTMLElement>this.pagecontainerelement.nativeElement;
      this.pagecontainer.classList.toggle("expand");
    }
  }
}
