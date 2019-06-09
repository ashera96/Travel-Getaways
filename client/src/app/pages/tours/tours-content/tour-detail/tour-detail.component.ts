import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Tour } from 'src/app/models/tour.model';
import { TourService } from 'src/app/services/tour/tour.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookmarkService } from 'src/app/services/bookmark/bookmark.service';
import { Bookmark } from 'src/app/models/bookmark.model';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent implements OnInit {
  bookingForm: FormGroup = new FormGroup({
    dp: new FormControl(null, [Validators.required]),
    adults: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
    children: new FormControl(null, [Validators.pattern(/^[0-9]*$/)])
  });
  
  loggedIn: boolean = false;
  id: string;
  tour: Tour;
  cities: string[];
  userProfile;
  showBookmarkSuccessMessage: boolean = false;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  bookmarks: Bookmark[]; // Already bookmarked tour list
  isBookmarked: boolean = false; // To check if tour has already been bookmarked by the customer

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
                this.authService.getProfile()
                  .subscribe(
                    (data:any) => {
                      this.userProfile = data.user;
                      console.log(this.userProfile);
                      this.bookmarkService.getBookmarks(this.userProfile._id)
                        .subscribe(
                          (data: any) => {
                            this.bookmarks = data.bookmarks;
                            this.isBookmarked = this.bookmarks.some(bookmarked_tour => bookmarked_tour.tour_id === this.tour._id );
                            console.log(this.isBookmarked);
                          },
                          (error: any) => {
                            console.log("Error occured : " + error);
                          }
                        );
                    },
                    (error: any) => {
                      console.log("Error occured : " + error);
                    }
                  );
              },
              (error: any) => {
                console.log('Error occured');
                console.log(error);
                this.router.navigate(['/not-found']);
              }
            );
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
    const tour_image = this.tour.tour_image;
    const obj = {
      "user_id" : user_id,
      "tour_id" : tour_id,
      "tour_title" : tour_title,
      "tour_duration" : tour_duration,
      "tour_price_adult" : tour_price_adult,
      "tour_price_child" : tour_price_child,
      "tour_image" : tour_image
    }
    this.bookmarkService.saveBookmark(obj)
      .subscribe(
        (data: any) => {
          console.log('Bookmark added successfully');
          this.showBookmarkSuccessMessage = true;
          this.isBookmarked = true;
        },
        error => {
          console.log("Error occurred");
        }
      );
  }
  
  removeBookmark() {
    this.isBookmarked = false;
    const bookmark = this.bookmarks.find(bookmarked_tour => bookmarked_tour.tour_id === this.tour._id );
    this.bookmarkService.removeBookmark(bookmark._id)
      .subscribe(
        (data: any) => {
          console.log('Bookmark removed successfully');
        },
        error => {
          console.log('Error occured');
        }
      );
  }

  onPurchase() {
    const user_id = this.userProfile._id;
    const tour_id = this.tour._id;
    const tour_title = this.tour.title;
    const dp = this.bookingForm.value.dp;
    const adults = this.bookingForm.value.adults;
    const children = this.bookingForm.value.children;
    const price = this.tour.price_adult * this.bookingForm.value.adults + this.tour.price_child * this.bookingForm.value.children;

    const obj = {
      "user_id" : user_id,
      "tour_id" : tour_id,
      "tour_title" : tour_title,
      "dp" : dp,
      "adults" : adults,
      "children" : children,
      "price" : price
    }

    if (!this.bookingForm.valid) {
      console.log('Invalid');
      this.bookingForm.reset();
    } else {
      console.log(JSON.stringify(obj));
      this.tourService.submitBooking(JSON.stringify(obj))
        .subscribe(
          (data:any) => {
            this.showSuccessMessage = true;
            console.log('Booking successful');
          },
          (error: any) => {
            this.showErrorMessage = true;
            console.log("Error occured");
            console.log(error);
          }
        );
      this.bookingForm.reset();
    }
  }

}
