import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.getProfile()
    .subscribe(
      (data:any) => {
        this.username = data.user.name.split(" ")[0];
      },
      (error: any) => {
        console.log("Error occured : " + error);
      }
    );
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
