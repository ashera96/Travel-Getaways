import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { HomeComponent } from "./pages/home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { HomeContentComponent } from "./pages/home/home-content/home-content.component";
import { AboutComponent } from "./pages/about/about.component";
import { AboutContentComponent } from "./pages/about/about-content/about-content.component";
import { ToursComponent } from "./pages/tours/tours.component";
import { TestimonialsComponent } from "./pages/testimonials/testimonials.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ContactContentComponent } from "./pages/contact/contact-content/contact-content.component";
import { TestimonialsContentComponent } from "./pages/testimonials/testimonials-content/testimonials-content.component";
import { ChatBotComponent } from "./chat-bot/chat-bot.component";
import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { ContactService } from './services/contact/contact.service';
import { BookmarkComponent } from './pages/bookmark/bookmark.component';
import { BookmarkContentComponent } from './pages/bookmark/bookmark-content/bookmark-content.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { BookingsContentComponent } from './pages/bookings/bookings-content/bookings-content.component';
import { ToursContentComponent } from './pages/tours/tours-content/tours-content.component';
import { TourService } from './services/tour/tour.service';
import { TourDetailComponent } from './pages/tours/tours-content/tour-detail/tour-detail.component';
import { BookmarkService } from './services/bookmark/bookmark.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    HomeContentComponent,
    AboutComponent,
    AboutContentComponent,
    ToursComponent,
    TestimonialsComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ContactContentComponent,
    TestimonialsContentComponent,
    ChatBotComponent,
    BookmarkComponent,
    BookmarkContentComponent,
    BookingsComponent,
    BookingsContentComponent,
    ToursContentComponent,
    TourDetailComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgFlashMessagesModule.forRoot(),
    NgbModule
  ],
  providers: [
    AuthService, 
    AuthGuardService, 
    ContactService, 
    TourService, 
    BookmarkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
