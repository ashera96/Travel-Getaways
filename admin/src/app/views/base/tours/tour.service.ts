import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Tour } from './tour.model';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }

  // Uploading the image
  uploadImage(image) {
    const formData = new FormData();
    formData.append('tour_image', image);
    return this.http.post('http://localhost:3000/tours/uploadimage', formData);
  }

  // Adding tour
  addTour(body) {
    return this.http.post(
      'http://localhost:3000/tours',
      body,
      {
        observe: 'body',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      });
  }

  // Get all tours
  getTours() {
    return this.http.get('http://localhost:3000/tours');
  }

  // Update tour
  updateTour(id: string, body) {
    return this.http.patch(
      'http://localhost:3000/tours' + `/${id}`,
      body,
      {
        observe: 'body',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      }
    );
  }

  // Delete tour
  deleteTour(id: any) {
    return this.http.delete('http://localhost:3000/tours' + `/${id}`);
  }
}
