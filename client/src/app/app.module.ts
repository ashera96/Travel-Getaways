import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

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
    ChatBotComponent
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
    NgbAlertModule
  ],
  providers: [AuthService, AuthGuardService, ContactService],
  bootstrap: [AppComponent]
})
export class AppModule {}
