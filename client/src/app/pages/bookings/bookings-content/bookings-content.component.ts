import { Component, OnInit, AfterViewChecked  } from "@angular/core";

import { AuthService } from "src/app/services/auth/auth.service";
import { TourService } from "src/app/services/tour/tour.service";
import { Tour } from "src/app/models/tour.model";

declare let paypal: any;

@Component({
  selector: "app-bookings-content",
  templateUrl: "./bookings-content.component.html",
  styleUrls: ["./bookings-content.component.css"]
})
export class BookingsContentComponent implements AfterViewChecked {

  addScript: boolean = false;
  paypalLoad: boolean = true;

  finalAmount: number = 0;
  num:number = 0;

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
            for(this.num; this.num<this.bookings.length; this.num++){
              console.log(this.bookings[this.num].price);
              this.finalAmount= this.finalAmount + this.bookings[this.num].price; 
            }
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

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'Ac75lPF56Zzg5DYdWhKBcbc1LZg4ugmh40QTOhjJq1KLfIPZwKqJ4UkrX0HyfJs2ujUUR9KzAJSCieDs',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
      })
    }
  };
 
  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

}
