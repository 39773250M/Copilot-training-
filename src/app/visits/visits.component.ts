import { Component, OnInit } from '@angular/core';
import { VisitsService } from './../../../src/services/visits/visits.service'; // Import the VisitsService
import { Router } from '@angular/router'; // Import the Router
import { UsersService } from 'src/services/users/users.service';
import { PatientsService } from 'src/services/patients/patients.service';


interface Visit {
  id: number;
  date: string;
  time: string;
  treatment: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {
  vpatient = {
    visits: [] as Visit[]
  };
  visits: any[] = []; // Add this line
  user: any; // Replace 'any' with the actual type of your user data
  constructor(private patientService: PatientsService,private visitsService: VisitsService, private router: Router, private usersService:UsersService) { }

  ngOnInit(): void {
    const patientId = '3'; // Replace with the actual patient ID
    this.patientService.getPatient(patientId).subscribe( // here we need to get the patient detials
      (user: any) => {
        this.user = user;
        this.vpatient.visits = user.visits;
        this.visitsService.getVisits(patientId).subscribe(
          data => this.visits = data,
          error => console.error('Error fetching visits:', error)
        );
      },
      error => console.error(error)
    );
  }

  viewDetails(id: number): void {
    this.router.navigate(['/visit-details', id]);
  }

}
