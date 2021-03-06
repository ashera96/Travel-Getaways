import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessagesComponent implements OnInit {
  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  messages: Message[] = [];
  returnedArray: Message[];
  itemsPerPage: number = 5;
  currentPage: number = 1;
  replyBody: String = '';

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getMessages()
      .subscribe(
        (data: any) => {
          console.log('Messages retreived successsfully');
          // console.log(data);
          this.messages = data.messages;
          this.returnedArray = this.messages.slice(0, this.itemsPerPage);
          console.log(this.returnedArray);
          // this.totalItems = this.messages.length;
        },
        (error: any) => {
          console.log('Error occured');
          console.log(error);
        }
      );
  }

  pageChanged(event: any): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.messages.slice(startItem, endItem);
    console.log(this.returnedArray);
  }

  onSubmit(index: number) {
    // Retrieving the user sent message and email which admin is replying to
    let i = index + this.itemsPerPage * (this.currentPage - 1);
    const message = this.messages[i].message;
    const email = this.messages[i].email;
    const obj = {
      "message" : message,
      "reply" : this.replyBody,
      "email" : email
    }
    // console.log(obj);
    // console.log(this.messages[index]);
    this.messageService.sendReply(obj)
      .subscribe(
        (data: any) => {
          console.log('Reply sent successfully');
        },
        error => {
          console.log("Error occurred");
        }
      );
    this.replyBody = '';
  }

  modalClosed() {
    this.replyBody = '';
  }

}
