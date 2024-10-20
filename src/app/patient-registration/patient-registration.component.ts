import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersService } from 'src/services/users/users.service';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent  implements OnInit{
  registrationForm: FormGroup;
  successMessage: string = '';
  newPatient: any = {
    name: '',
    mobileNumber: ''
  };

  constructor(private usersService: UsersService,private http: HttpClient, private router: Router, private fb:FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });

  }
  ngOnInit(): void {
    // Clear the success message when the form values change
    this.registrationForm.valueChanges.subscribe(() => {
      this.successMessage = '';
    });
  }

  registerPatient(): void {
    if (this.registrationForm.valid) {
      const currentTime = new Date().toISOString(); // Get the current time in ISO format
    const patientData = {
      name: this.registrationForm.value.name,
      mobileNumber: this.registrationForm.value.mobileNumber,
      type: 'patient',
      time:currentTime ,
      condition: "Headache",
      password: 'password',
      treatment: "",
      notes: "",
      prescriptions:[]
    };

    this.usersService.createUser(patientData).subscribe(
      (response: any) => {
        console.log('Patient registered successfully:', response);
        this.successMessage = 'Patient registered successfully!';
          this.registrationForm.reset(); // Optionally reset the form
        this.router.navigate(['/patients']);
      },
      (error: any) => {
        console.error('Error registering patient:', error);
      }
    );
  }
  }
}
