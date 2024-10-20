import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../../../src/services/patients/patients.service'; // Adjust the path as necessary
 import { Patient } from '../../../src/models/patient'; // Adjust the path as necessary
 import { AuthService } from 'src/services/auth/auth.service';
 import { Router } from '@angular/router';
// import { get } from 'http';

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
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
 
})
export class PatientComponent implements OnInit {
  patientNotFound: boolean = false;
  patientId: number= 1 ; // Replace with the actual patient ID
  mobileNumber: string = ''; // Initialize the property
  patient: Patient = {} as Patient;
  vpatient = {
    visits: [] as Visit[]
  };
  errorMessage = '';
  
  visit:any[] = []; // Replace 'any' with the actual type of your visit data
 // patient: any; // Replace 'any' with the actual type of your patient data
  isdoctor:boolean = false;  // Replace 'any' with the actual type of your doctor data
  user: any;
   currentUser: string = '';

  constructor(private router: Router,private patientService: PatientsService, private authservice:AuthService) {}

  ngOnInit(): void {
     this.patientId = 2; // Replace with the actual patient ID
     this.getuserinfo();
   
    } 
   
    getuserinfo(){
      this.patientService.getPatient(this.patientId).subscribe( // here we need to get the patient detials
        (user: any) => {
          this.user = user;
          this.vpatient.visits = user.visits;
        
        // this.visitsService.getVisits(patientId).subscribe(
        //   visit => {
        //     this.visit = visit;
            this.patientService.getPatient(this.patientId).subscribe(
              patient => this.patient = patient,
              
              error =>{
                errorMessage: 'Error fetching patient details';
                console.error(error)
              } 
            );
            this.authservice.getCurrentUser().subscribe(
              (user1: any) => {
                if(user1){
                  console.log('currentUser:', user1);
                  this.currentUser = user1;
                  if(user1.role === 'doctor'){
                    this.isdoctor = true;
                  }
              }
            },
              (error: Error) => {
                errorMessage: 'Get user data service error';
                console.error(error)
              }

            );
          
          },
          error =>{
            errorMessage: 'Get patient data service error';
            console.error(error)
          } 
        );

    }

  searchPatient(): void {
    
    if (this.mobileNumber) {
    this.patientService.searchPatientByMobile(this.mobileNumber).subscribe(
      (patient: Patient) =>{
        if(patient){
         this.patientNotFound = false;
         if (Array.isArray(patient)) {
          this.patient = patient[0]; // It's an array
          this.patientId = patient[0].id;
            } else {
                this.patient = patient; // Assume it's a single object
            }
          // this.patient = patient[0];
          // this.patientId = patient[0].id;

          this.getuserinfo();
        } else {
          this.patientNotFound = true;
          console.error('Patient not found');
      } 
      (error: Error) => {
        this.patientNotFound = true;
        console.error('Error fetching patient:', error)
      }
    }
    );
  } else {
    console.error('Mobile number is not provided');
  }
  }

  addVisit(): void {
    this.router.navigate(['/add-visit', this.patientId]);
  }
}
