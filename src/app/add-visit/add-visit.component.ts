import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitsService } from './../../../src/services/visits/visits.service';
import { PatientsService } from './../../../src/services/patients/patients.service';
import { AuthService } from './../../../src/services/auth/auth.service';

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['./add-visit.component.scss']
})
export class AddVisitComponent implements OnInit {
  visitForm: FormGroup;
  patientId: number =1;
  patientDetails: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private visitService: VisitsService,
    private router: Router,
    private patientService:PatientsService,
    private authService: AuthService
  ) {
    this.visitForm = this.fb.group({
      consultation: ['', Validators.required],
      symptoms: ['', Validators.required],
      treatment: ['', Validators.required],
      advice: ['', Validators.required],
      prescriptions: this.fb.array([this.createPrescription()])
    });
    this.patientId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    // this.patientId = +this.route.snapshot.paramMap.get('id')!;
    // this.getPatientDetails();
    this.route.params.subscribe(params => {
      this.patientId = +params['id']; // The '+' converts the string 'id' to a number
    });
  }
  get prescriptions(): FormArray {
    return this.visitForm.get('prescriptions') as FormArray;
  }

  getPatientDetails(): void {
    this.patientService.getPatient(this.patientId).subscribe(
      (patient: any) => {
        this.patientDetails = patient;
        console.log('Patient details:', patient);
      },
      (error: any) => {
        console.error('Error fetching patient details:', error);
      }
    );
  }

  // addVisit(): void {
  //   if (this.visitForm.valid) {
  //     const visitData = {
  //       patientId: this.patientId,
  //       consultation: this.visitForm.value.consultation,
  //       treatment: this.visitForm.value.treatment,
  //       prescription: this.visitForm.value.prescription
  //     };

  //     this.visitService.addVisit(visitData).subscribe(
  //       (response: any) => {
  //         console.log('Visit added successfully:', response);
  //         this.router.navigate(['/patients']);
  //       },
  //       (error: any) => {
  //         console.error('Error adding visit:', error);
  //       }
  //     );
  //   }
  // }
  onSubmit(): void {
    if (this.visitForm.valid) {
      const visitData = {
        ...this.visitForm.value,
        patientId: this.patientId
      };
      this.visitService.addVisit(visitData).subscribe(
        response => {
          console.log('Visit added successfully', response);
          this.router.navigate(['/visits']);
        },
        error => {
          console.error('Error adding visit', error);
        }
      );
    }
  }

  createPrescription(): FormGroup {
    return this.fb.group({
      medicineName: ['', Validators.required],
      dosage: this.fb.group({
        morning: [false],
        afternoon: [false],
        evening: [false]
      }),
      afterMeals: [false],
      duration: ['', [Validators.required, Validators.min(1)]]
    });
  }


  addPrescription(): void {
    this.prescriptions.push(this.createPrescription());
  }

  removePrescription(index: number): void {
    this.prescriptions.removeAt(index);
  }

  saveVisit(): void {
    const visit = {
      DoctorID: this.authService.getCurrentUser, // Assuming AuthService has a method to get the logged-in user's ID
      PatientID: this.patientId,
      Date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      Time: new Date().toTimeString().split(' ')[0].slice(0, 5), // Current time in HH:MM format
      Symptoms: this.visitForm.value.symptoms,
      Treatment: this.visitForm.value.treatment,
      Advice: this.visitForm.value.advice,
      Prescriptions: this.visitForm.value.prescriptions
    };

    this.visitService.addVisit(visit).subscribe(
      (response) => {
        console.log('Visit saved successfully', response);
        this.router.navigate(['/visits']); // Navigate to the visits list or another appropriate page
      },
      (error) => {
        console.error('Error saving visit', error);
      }
    );
  }
  // toggleDosage(prescription: FormGroup, time: string): void {
  //   const control = prescription.get(`dosage.${time}`);
  //   control.setValue(!control.value);
  // }

  // toggleMealTime(prescription: FormGroup, afterMeals: boolean): void {
  //   prescription.get('afterMeals').setValue(afterMeals);
  // }


}