import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
    console.log('Sucessfully logged out');
    this.router.navigate(['/']);
    return false;
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
