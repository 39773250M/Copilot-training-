import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { VisitsComponent } from './visits/visits.component';
import { VisitDetailsComponent } from './visit-details/visit-details.component';

const routes: Routes = [
  {
    path:'login', component:LoginComponent
    
  },
  {
    path:'visits', component:VisitsComponent
  },{ path: 'visit-details/:id', component: VisitDetailsComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
