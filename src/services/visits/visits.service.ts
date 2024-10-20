import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {
  private apiUrl = 'http://localhost:3000/patients/'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getVisits(patientId: number): Observable<any> {
    const url = `${this.apiUrl}${patientId}`;
    return this.http.get<any>(url);
  }
  getVisitDetails(visitId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${visitId}`);
  }
  addVisit(visitData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, visitData);
  }
}
