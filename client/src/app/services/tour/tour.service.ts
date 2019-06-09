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

  submitBooking(body) {
    return this.http.post(
      'http://localhost:3000/bookings',
      body,
      {
        observe: 'body',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      });
  }

  getBookings(userId: String) {
    return this.http.get(
      'http://localhost:3000/bookings' + `/${userId}`,
      {headers: new HttpHeaders().append('Content-Type', 'application/json')}
    );
  }

  removeBookings(bookingsId: String) {
    return this.http.delete('http://localhost:3000/bookings' + `/${bookingsId}`);
  }
}
