import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(private http: HttpClient) { }

  saveBookmark(id:string, body) {
    return this.http.post(
      'http://localhost:3000/bookmarks/',
      body,
      {
        observe: 'body',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      });
  }
}
// 'http://localhost:3000/bookmarks/' + `/${id}`,