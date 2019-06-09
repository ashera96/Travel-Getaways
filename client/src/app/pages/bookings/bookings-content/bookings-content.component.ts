import { Component, OnInit } from "@angular/core";

import { AuthService } from "src/app/services/auth/auth.service";
import { TourService } from "src/app/services/tour/tour.service";
import { Tour } from "src/app/models/tour.model";

@Component({
  selector: "app-bookings-content",
  templateUrl: "./bookings-content.component.html",
  styleUrls: ["./bookings-content.component.css"]
})
export class BookingsContentComponent implements OnInit {
  userProfile;
  bookings: Tour[];
  id: string;

  constructor(
    private authService: AuthService,
    private tourService: TourService,
  ) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(
      (data: any) => {
        this.userProfile = data.user;
        console.log(this.userProfile);
        this.tourService.getBookings(this.userProfile._id).subscribe(
          (data: any) => {
            this.bookings = data.bookings;
            console.log(this.bookings);
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
  }

  removeBookings(index: number) {
    this.tourService.removeBookings(this.bookings[index]._id)
    .subscribe(
      (data: any) => {
        console.log('Booking removed successfully');
      },
      error => {
        console.log('Error occured');
      }
    );
    this.ngOnInit();
  }
}
