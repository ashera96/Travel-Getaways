import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ToursComponent } from './pages/tours/tours.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { BookmarkComponent } from './pages/bookmark/bookmark.component';
import { TourDetailComponent } from './pages/tours/tours-content/tour-detail/tour-detail.component';
import { ToursContentComponent } from './pages/tours/tours-content/tours-content.component';
import { TourSearchComponent } from './pages/tours/tours-content/tour-search/tour-search.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'about', component: AboutComponent},
    { path: 'tours', component: ToursComponent, children: [
        { path: '', component: ToursContentComponent},
        { path: ':id', component: TourDetailComponent},
        { path: 'search/:city/:duration', component: TourSearchComponent}
    ]},
    { path: 'testimonials', component: TestimonialsComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuardService]},
    { path: 'bookmarks', component: BookmarkComponent, canActivate: [AuthGuardService]},
    { path: 'not-found', component: PageNotFoundComponent},
    { path: '**', redirectTo: '/not-found'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}