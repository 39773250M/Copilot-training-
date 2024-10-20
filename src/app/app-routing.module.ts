import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { VisitsComponent } from './visits/visits.component';
import { VisitDetailsComponent } from './visit-details/visit-details.component';
import { PatientComponent } from './patient/patient.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { AddVisitComponent } from './add-visit/add-visit.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'login', component:LoginComponent },
  // { path: 'protected', component: , canActivate: [AuthGuard] },
  {path:'visits', component:VisitsComponent,  },
  { path: 'visit-details/:id', component: VisitDetailsComponent, },
  { path: 'patient', component: PatientComponent,  },
  { path: 'register-patient', component: PatientRegistrationComponent,  },
  { path: 'add-visit/:id', component: AddVisitComponent, },
  { path: '', redirectTo: '/patients', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
