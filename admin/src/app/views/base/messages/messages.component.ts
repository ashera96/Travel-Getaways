import { Component, OnInit, Input } from '@angular/core';

import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  
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
