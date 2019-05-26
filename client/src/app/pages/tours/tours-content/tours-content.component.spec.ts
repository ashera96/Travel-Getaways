import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursContentComponent } from './tours-content.component';

describe('ToursContentComponent', () => {
  let component: ToursContentComponent;
  let fixture: ComponentFixture<ToursContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToursContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToursContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
