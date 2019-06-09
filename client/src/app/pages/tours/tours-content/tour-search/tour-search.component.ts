import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { TourService } from 'src/app/services/tour/tour.service';
import { Tour } from 'src/app/models/tour.model';
import { Bookmark } from 'src/app/models/bookmark.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookmarkService } from 'src/app/services/bookmark/bookmark.service';

@Component({
  selector: 'app-tour-search',
  templateUrl: './tour-search.component.html',
  styleUrls: ['./tour-search.component.css']
})
export class TourSearchComponent implements OnInit {
  userProfile;
  tours: Tour[];
  bookmarks: Bookmark[];
  isBookmarked: boolean[] = [];
  isLoggedIn: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private tourService: TourService,
              private authService: AuthService,
              private bookmarkService: BookmarkService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          const city = params['city'];
          const duration = params['duration'];
          this.tourService.searchTours(city, duration)
            .subscribe(
              (data: any) => {
                console.log('Tour search successfully completed');
                this.tours = data.messages;
                console.log(this.tours);

                this.tours.forEach((element, index) => {
                  this.isBookmarked[index] = false;
                });
      
                this.authService.getProfile()
                  .subscribe(
                    (data: any) => {
                      this.userProfile = data.user;
                      this.isLoggedIn = true;
                      // console.log(this.userProfile);
                      this.bookmarkService.getBookmarks(this.userProfile._id)
                        .subscribe(
                          (data: any) => {
                            this.bookmarks = data.bookmarks;
                            // Checking already bookmarked tours
                            this.bookmarks.forEach((element) => {
                              const bookmark_tour_id = element.tour_id;
                              this.tours.forEach((element, index) => {
                                if (bookmark_tour_id === element._id) {
                                  this.isBookmarked[index] = true;
                                }
                              });
                            });
      
                          },
                          (error: any) => {
                            console.log("Error occured : " + error);
                          }
                        );
                    },
                    (error: any) => {
                      this.isLoggedIn = false;
                      console.log('Error occured : ' + error ); 
                    }
                  );
              },
              (error: any) => {
                console.log("Error occured : " + error);
              }
            );
        },
        (error: any) => {
          console.log('Error occured : ' + error);
        }
      );
  }

  addBookmark(index: number) {
    this.isBookmarked[index] = true;
    const user_id = this.userProfile._id;
    const tour_id = this.tours[index]._id;
    const tour_title = this.tours[index].title;
    const tour_duration = this.tours[index].duration;
    const tour_price_adult = this.tours[index].price_adult;
    const tour_price_child = this.tours[index].price_child;
    const tour_image = this.tours[index].tour_image;
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
          this.isBookmarked[index] = true;
        },
        error => {
          console.log("Error occurred");
        }
      );
  }

  removeBookmark(index: number) {
    this.isBookmarked[index] = false;
    const bookmark_tour_id =  this.tours[index]._id;
    this.bookmarks.forEach((element) => {
      if (bookmark_tour_id === element.tour_id) {
        this.bookmarkService.removeBookmark(element._id)
          .subscribe(
            (data: any) => {
              console.log('Bookmark removed successfully');
            },
            error => {
              console.log('Error occured');
            }
          );
      }
    });
  }

}
