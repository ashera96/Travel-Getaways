import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { TourService } from './tour.service';
import { Tour } from './tour.model';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToursComponent implements OnInit {
  tours: Tour[] = [];
  returnedArray: Tour[];
  itemsPerPage: number = 5;
  currentPage: number = 1;

  constructor(private tourService: TourService) { }

  ngOnInit() {
    this.tourService.getTours()
      .subscribe(
        (data: any) => {
          console.log('Tours retrieved successfully');
          this.tours = data.messages;
          this.returnedArray = this.tours.slice(0, this.itemsPerPage);
          console.log(this.returnedArray);
        },  
        (error: any) => {
          console.log('Error occured');
          console.log(error);
        }
      );
  }

  pageChanged(event: any): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.tours.slice(startItem, endItem);
    console.log(this.returnedArray);
  }

}
