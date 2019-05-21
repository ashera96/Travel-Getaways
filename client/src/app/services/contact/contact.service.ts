import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  submitMessage(body) {
    return this.http.post(
      'http://localhost:3000/messages',
      body,
      {
        observe: 'body',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      });
  }
}
