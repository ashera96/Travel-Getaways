import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Tour } from '../tour.model';
import { TourService } from '../tour.service';

@Component({
  selector: 'app-add-tours',
  templateUrl: './add-tours.component.html',
  styleUrls: ['./add-tours.component.scss']
})
export class AddToursComponent implements OnInit {
  tourForm: FormGroup;
  image;
  imagename: string = '';

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private tourService: TourService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.initForm();
        }
      );
  }
  
  private initForm() {
    let title = '';
    let duration = 0;
    let description = '';
    let city = '';
    let address = '-';
    let price_adult = null;
    let price_child = null;
    let program = new FormArray([]);

    this.tourForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'duration': new FormControl(duration, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'description': new FormControl(description, Validators.required),
      'city': new FormControl(city, Validators.required),
      'address': new FormControl(address, Validators.required),
      'price_adult': new FormControl(price_adult, [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)]),
      'price_child': new FormControl(price_child, [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)]),
      'program': program,

    });
  }

  onAddProgram() {
    (<FormArray>this.tourForm.get('program')).push(
      new FormGroup({
        'title': new FormControl(null, Validators.required),
        'description': new FormControl(null, [Validators.required])
      })
    );
  }

  onDeleteProgram(index: number) {
    (<FormArray>this.tourForm.get('program')).removeAt(index);
  }

  getControls() {
    return (<FormArray>this.tourForm.get('program')).controls;
  }

  createFormData(event) {
    this.image = event.target.files[0];
    this.imagename = event.target.files[0].name;
    console.log(this.imagename);
  }

  onSubmit() {
    if (this.imagename === '') {
      console.log("Image not found");
      alert("Please upload an image");
    } else {
      const newTour = new Tour(
        this.tourForm.value['title'],
        this.tourForm.value['duration'],
        this.tourForm.value['description'],
        this.tourForm.value['city'],
        this.tourForm.value['address'],
        this.tourForm.value['price_adult'],
        this.tourForm.value['price_child'],
        this.tourForm.value['program'],
        this.imagename
      );
      // console.log(JSON.stringify(newTour));
      this.tourService.addTour(JSON.stringify(newTour))
        .subscribe(
          (data: any) => {
            console.log('Tour added successfully');
            this.tourService.uploadImage(this.image)
              .subscribe(
                (result) => {
                  console.log('Image upload completed');
                },
                (error) => {
                  console.log('Error occured in image upload');
                } 
              );
          },
          (error: any) => {
            console.log('Error occured');
            console.log(error);
          }
        );
      this.tourForm.reset();
    }
  }
}
