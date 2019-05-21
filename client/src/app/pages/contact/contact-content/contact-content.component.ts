import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-contact-content',
  templateUrl: './contact-content.component.html',
  styleUrls: ['./contact-content.component.css']
})
export class ContactContentComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    telephone: new FormControl(null, [Validators.required]),
    message:new FormControl(null, [Validators.required])
  });
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.contactForm.valid) {
      console.log('Invalid');
      this.contactForm.reset();
    } else {
      // console.log(JSON.stringify(this.contactForm.value));
      this.contactService.submitMessage(JSON.stringify(this.contactForm.value))
        .subscribe(
          (data:any) => {
            this.showSuccessMessage = true;
            console.log('Message sent successfully');
          },
          (error: any) => {
            this.showErrorMessage = true;
            console.log("Error occured");
            console.log(error);
          }
        );
      this.contactForm.reset();
    }

  }

}
