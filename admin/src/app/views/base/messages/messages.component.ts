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

  onReset() {
    this.replyBody = '';
  }

  onSubmit() {
    console.log(this.replyBody);
  }

}
