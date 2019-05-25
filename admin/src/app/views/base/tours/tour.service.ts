import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

}
