import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }

  getTours() {
    return this.http.get(
      'http://localhost:3000/tours/',
      {headers: new HttpHeaders().append('Content-Type', 'application/json')}
    );
  }

  getTour(id: string) {
    return this.http.get(
      'http://localhost:3000/tours/' + `/${id}`,
      {headers: new HttpHeaders().append('Content-Type', 'application/json')}
    );
  }
}
