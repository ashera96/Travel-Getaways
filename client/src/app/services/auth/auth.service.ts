import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any = null;
  user: any;

  constructor(private http: HttpClient,
              private router: Router) { }

  // Signup
  registerUser(body) {
    return this.http.post(
      'http://localhost:3000/users/register', 
      body,
      {
        observe: 'body',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      });
  }

  // Signin
  authenticateUser(body) {
    return this.http.post(
      'http://localhost:3000/users/authenticate', 
      body,
      {
        observe: 'body',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      });
  }

  // Storing user data locally
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile()  {
    // if (localStorage.getItem('id_token') != null) {
    //   const token = localStorage.getItem('id_token');
      // this.authToken = token;
    //   return this.http.get('http://localhost:3000/users/profile', {headers: new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json')});
    // }
    // else {

    // }
      this.getToken();
      return this.http.get('http://localhost:3000/users/profile', {headers: new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json')});
  }

  getToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  isAuthenticated() {
    return this.authToken!=null
  }

  // Logout
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
