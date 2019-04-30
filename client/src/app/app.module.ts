import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeContentComponent } from './pages/home/home-content/home-content.component';
import { AboutComponent } from './pages/about/about.component';
import { AboutContentComponent } from './pages/about/about-content/about-content.component';
import { ToursComponent } from './pages/tours/tours.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ContactContentComponent } from './pages/contact/contact-content/contact-content.component';
import { TestimonialsContentComponent } from './pages/testimonials/testimonials-content/testimonials-content.component';

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
    TestimonialsContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
