import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsContentComponent } from './bookings-content.component';

describe('BookingsContentComponent', () => {
  let component: BookingsContentComponent;
  let fixture: ComponentFixture<BookingsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
