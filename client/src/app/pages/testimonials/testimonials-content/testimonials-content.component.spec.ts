import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsContentComponent } from './testimonials-content.component';

describe('TestimonialsContentComponent', () => {
  let component: TestimonialsContentComponent;
  let fixture: ComponentFixture<TestimonialsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
