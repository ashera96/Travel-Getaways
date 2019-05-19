import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  @ViewChild('myModal') public myModal: ModalDirective;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getMessages()
      .subscribe(
        (data: any) => {
          console.log('Messages retreived successsfully');
          // console.log(data);
          this.messages = data.messages;
        },
        (error: any) => {
          console.log('Error occured');
          console.log(error);
        }
      );
  }

}
