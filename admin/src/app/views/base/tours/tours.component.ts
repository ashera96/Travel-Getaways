import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';

import { TourService } from './tour.service';
import { Tour } from './tour.model';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToursComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  tours: Tour[] = [];
  returnedArray: Tour[];
  itemsPerPage: number = 5;
  currentPage: number = 1;
  updateTourForm: FormGroup;
  editMode = false;
  editTour: Tour;
  image;
  imagename: string = '';
  imageChanges: number = 0;

  constructor(private tourService: TourService,
              private router: Router,
              private route: ActivatedRoute) { }

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
    this.currentPage = event.page;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.tours.slice(startItem, endItem);
    console.log(this.returnedArray);
  }

  updateTour(index: string) {
    let i = index + this.itemsPerPage * (this.currentPage - 1);
    const tourId = this.tours[i]['_id'];
    this.editTour = this.tours[i]; 
    this.editMode = true;
    this.createUpdateForm();
  }

  deleteTour(index: number) {
    let i = index + this.itemsPerPage * (this.currentPage - 1);
    const tourId = this.tours[i]['_id'];
    this.tourService.deleteTour(tourId) 
      .subscribe(
        (result: any) => {
          console.log('Tour deleted successfully')
        },
        (error: any) => {
          console.log('Error occured');
          console.log(error);
        }
      );
    this.currentPage = 1;
    this.ngOnInit();
    // window.location.reload()
    // this.router.navigate(['/'], {relativeTo: this.route})
  }

  private createUpdateForm() {
    let title = this.editTour.title;
    let duration = this.editTour.duration;
    let description = this.editTour.description;
    let city = this.editTour.city;
    let address = this.editTour.address;
    let price_adult = this.editTour.price_adult;
    let price_child = this.editTour.price_child;
    let program = new FormArray([]);
    if (this.editTour['program']) {
      for (let prog of this.editTour.program) {
        program.push(
          new FormGroup({
            'title': new FormControl(prog['title'], Validators.required),
            'description': new FormControl(prog['description'], [Validators.required])
          })
        );
      }
    }
    if (this.editTour.tour_image) {
      this.imagename = this.editTour.tour_image;
      console.log(this.imagename);
    }

    this.updateTourForm = new FormGroup({
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
    (<FormArray>this.updateTourForm.get('program')).push(
      new FormGroup({
        'title': new FormControl(null, Validators.required),
        'description': new FormControl(null, [Validators.required])
      })
    );
  }

  onDeleteProgram(index: number) {
    (<FormArray>this.updateTourForm.get('program')).removeAt(index);
  }

  getControls() {
    return (<FormArray>this.updateTourForm.get('program')).controls;
  }

  createFormData(event) {
    this.image = event.target.files[0];
    this.imagename = event.target.files[0].name;
    this.imageChanges += 1;
  }
  
  addTour() {
    this.router.navigate(['../add-tour'], {relativeTo: this.route})
  }

  quitEditMode() {
    this.editMode = false;
  }

  onAddNewImage() {
    this.imagename = '';
    this.imageChanges += 1;
  }

  onUpdate() {
    if (this.imagename === '') {
      console.log("Image not found");
      alert("Please upload an image");
    } else {
      const newTour = new Tour(
        this.updateTourForm.value['title'],
        this.updateTourForm.value['duration'],
        this.updateTourForm.value['description'],
        this.updateTourForm.value['city'],
        this.updateTourForm.value['address'],
        this.updateTourForm.value['price_adult'],
        this.updateTourForm.value['price_child'],
        this.updateTourForm.value['program'],
        this.imagename
      );
      this.tourService.updateTour(this.editTour['_id'], JSON.stringify(newTour))
        .subscribe(
          (data: any) => {
            console.log('Tour updated successfully');
            if (this.imagename === this.editTour['tour_image']) {
              console.log('Image was not updated since it was not updated by admin');
            } else {
              this.tourService.uploadImage(this.image)
                .subscribe(
                  (result) => {
                    console.log('Image upload completed');
                  },
                  (error) => {
                    console.log('Error occured in image upload');
                  } 
                );
            }
          },
          (error: any) => {
            console.log('Error occuered');
            console.log(error);
          }
        );
    }

    // Updating property values
    this.imagename = '';
    this.editMode = false;

    this.currentPage = 1;
    this.ngOnInit();
    // window.location.reload();
    // this.router.navigate(['/'], {relativeTo: this.route});
  }
}
