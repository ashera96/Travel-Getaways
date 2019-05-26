import { Component, OnInit } from '@angular/core';

import { TourService } from 'src/app/services/tour/tour.service';
import { Tour } from 'src/app/models/tour.model';

@Component({
  selector: 'app-tours-content',
  templateUrl: './tours-content.component.html',
  styleUrls: ['./tours-content.component.css']
})
export class ToursContentComponent implements OnInit {
  tours: Tour[];

  constructor(private tourService: TourService) { }

  ngOnInit() {
    this.tourService.getTours()
      .subscribe(
        (data: any) => {
          console.log('Tours retrieved successfully');
          this.tours = data.messages;
        },  
        (error: any) => {
          console.log('Error occured');
          console.log(error);
        }
      );
  }
}