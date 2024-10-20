import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BannerComponent } from './banner/banner.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { VisitsComponent } from './visits/visits.component';
import { VisitDetailsComponent } from './visit-details/visit-details.component';
import { PatientComponent } from './patient/patient.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { AddVisitComponent } from './add-visit/add-visit.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavigationComponent,
    BannerComponent,
    LoginComponent,
    VisitsComponent,
    VisitDetailsComponent,
    PatientComponent,
    PatientRegistrationComponent,
    AddVisitComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
