import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({
    city: new FormControl(null, Validators.required),
    duration: new FormControl(null, Validators.required)
  })

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSearch() {
    if (!this.searchForm.valid) {
      console.log('Invalid');
      this.searchForm.reset();
    } else {
      const city = this.searchForm.value.city;
      const duration = this.searchForm.value.duration;
      // console.log(JSON.stringify(this.searchForm.value));
      this.router.navigate(['/tours/search/' + city + '/' + duration]);
      this.searchForm.reset();
    }
  }

}
