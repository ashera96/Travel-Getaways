import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Tour } from 'src/app/models/tour.model';
import { TourService } from 'src/app/services/tour/tour.service';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent implements OnInit {
  id: string;
  tour: Tour;
  cities: string[];

  constructor(private route: ActivatedRoute,
              private tourService: TourService) { }

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
              },
              (error: any) => {
                console.log('Error occured');
                console.log(error);
              }
            );
        }
      );
  }

}
