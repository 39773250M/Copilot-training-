import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisitsService } from './../../services/visits/visits.service';
import { UsersService } from './../../services/users/users.service';
import { PatientsService } from 'src/services/patients/patients.service';
//import { Visit } from './../../models/visit.interface'
import { AuthService } from 'src/services/auth/auth.service';

interface Visit {
condition: any;

  id: number;
  date: string;
  time: string;
  treatment: string;
  // Add other properties as needed
  prescriptions: [
    {
      medicineName: string;
              dosage: string;
              medicineCount: number;
              afterMeal: boolean;
            durationDate: string;
            advice: string
    }
  ]
}

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.scss']
})
export class VisitDetailsComponent implements OnInit {
  vpatient = {
    visits: [] as Visit[]
  };
  
  visit:any[] = []; // Replace 'any' with the actual type of your visit data
  patient: any; // Replace 'any' with the actual type of your patient data
  doctor: any; // Replace 'any' with the actual type of your doctor data
  user: any;
   currentUser: string = '';
  //visit: Visit;
  constructor(private authservice:AuthService,private patientService:PatientsService, private route: ActivatedRoute, private visitsService: VisitsService, private usersService: UsersService) { }

    ngOnInit(): void {
      const patientId = 3; // Replace with the actual patient ID
      this.patientService.getPatient(patientId).subscribe( // here we need to get the patient detials
        (user: any) => {
          this.user = user;
          this.vpatient.visits = user.visits;
        
        // this.visitsService.getVisits(patientId).subscribe(
        //   visit => {
        //     this.visit = visit;
            this.patientService.getPatient(patientId).subscribe(
              patient => this.patient = patient,
              error => console.error(error)
            );
            this.authservice.getCurrentUser().subscribe(
              (user1: any) =>  (user1: any) => {
                if(user1){
                  console.log('currentUser:', user1);
                  this.currentUser = user1;
              }
            },
              (error: Error) => console.error(error)
            );
          
          },
          error => console.error(error)
        );
      } 
    
       
    
    }


