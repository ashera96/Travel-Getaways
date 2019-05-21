import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  // Retrieve user sent messages from backend
  getMessages() {
    return this.http.get('http://localhost:3000/messages');
  }

  // Sending email reply
  sendReply(body) {
    return this.http.post(
      'http://localhost:3000/reply',
      body,
      {
        observe: 'body',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      });
  }
}
