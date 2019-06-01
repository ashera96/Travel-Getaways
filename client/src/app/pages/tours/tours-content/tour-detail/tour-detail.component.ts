import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Tour } from 'src/app/models/tour.model';
import { TourService } from 'src/app/services/tour/tour.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookmarkService } from 'src/app/services/bookmark/bookmark.service';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent implements OnInit {
  bookingForm: FormGroup = new FormGroup({
    dp: new FormControl(null, [Validators.required]),
    adults: new FormControl(null, [Validators.required]),
    children: new FormControl(null, [Validators.required])
  });
  
  loggedIn: boolean = false;
  id: string;
  tour: Tour;
  cities: string[];
  userProfile;
  showBookmarkSuccessMessage: boolean = false;

  constructor(private route: ActivatedRoute,
              private tourService: TourService,
              private authService: AuthService,
              private router: Router,
              private bookmarkService: BookmarkService) { }

  ngOnInit() {
    this.route.params 
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          console.log(this.id);
          this.tourService.getTour(this.id)
            .subscribe(
              (data: any) => {
                this.tour = data.message;
                console.log(this.tour);
                this.cities = this.tour.city.split(',');
                this.loggedIn = this.authService.isAuthenticated();
              },
              (error: any) => {
                console.log('Error occured');
                console.log(error);
                this.router.navigate(['/not-found']);
              }
            );
        }
      );
    this.authService.getProfile()
    .subscribe(
      (data:any) => {
        this.userProfile = data.user;
        console.log(this.userProfile);
      },
      (error: any) => {
        console.log("Error occured : " + error);
      }
    );
  }

  addBookmark() {
    const user_id = this.userProfile._id;
    const tour_id = this.tour._id;
    const tour_title = this.tour.title;
    const tour_duration = this.tour.duration;
    const tour_price_adult = this.tour.price_adult;
    const tour_price_child = this.tour.price_child;
    const obj = {
      "user_id" : user_id,
      "tour_id" : tour_id,
      "tour_title" : tour_title,
      "tour_duration" : tour_duration,
      "tour_price_adult" : tour_price_adult,
      "tour_price_child" : tour_price_child
    }
    this.bookmarkService.saveBookmark(obj)
      .subscribe(
        (data: any) => {
          console.log('Bookmark added successfully');
          this.showBookmarkSuccessMessage = true;
        },
        error => {
          console.log("Error occurred");
        }
      );
  }

}
