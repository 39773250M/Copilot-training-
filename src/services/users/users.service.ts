import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/patients';
  private loggedInuser = 'http://localhost:3000/users'; // Add this line
  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  getloggesInUser(): Observable<any> {
    return this.http.get<any>(`${this.loggedInuser}`);
  }
}
