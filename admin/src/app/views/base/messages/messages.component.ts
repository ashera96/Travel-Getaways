import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  returnedArray: Message[];
  itemsPerPage: number = 5;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getMessages()
      .subscribe(
        (data: any) => {
          console.log('Messages retreived successsfully');
          // console.log(data);
          this.messages = data.messages;
          this.returnedArray = this.messages.slice(0, 5);
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
    // console.log('Page changed to: ' + event.page);
    // console.log('Number items per page: ' + event.itemsPerPage);
  }

}
