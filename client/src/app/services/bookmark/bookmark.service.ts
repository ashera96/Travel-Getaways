import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(private http: HttpClient) { }

  saveBookmark(body) {
    return this.http.post(
      'http://localhost:3000/bookmarks',
      body,
      {
        observe: 'body',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      });
  }

  getBookmarks(userId: String) {
    return this.http.get(
      'http://localhost:3000/bookmarks' + `/${userId}`,
      {headers: new HttpHeaders().append('Content-Type', 'application/json')}
    );
  }

  removeBookmark(bookmarkId: String) {
    return this.http.delete('http://localhost:3000/bookmarks' + `/${bookmarkId}`);
  }
}