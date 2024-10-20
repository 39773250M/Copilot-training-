import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from './../../../src/models/patient';

// export interface Patient {
//   id: string;
//   name: string;
//   mobileNumber: string;
//   // Add other properties as needed
// }

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private apiUrl = 'http://localhost:3000/patients';
  constructor(private http: HttpClient) { }

  getPatient(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  searchPatientByMobile(mobileNumber: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/?mobileNumber=${mobileNumber}`);
  }
}
