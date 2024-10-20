import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false; // Add this line
  private currentUser: any;
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient,private router: Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?username=${username}`).pipe(
      map((users: any[]) => {
        for (let user of users) {
        //console.log('Login successful 00', users);
        if (user.username === username && user.password === password) {
          console.log('Login successful 11');
          this.loggedIn = true;
          this.currentUser = user;
          return user;
        } 
      }
      })
    );
  }

  getCurrentUser(): Observable<any> {
    const user = localStorage.getItem('currentUser');
    return of(user ? JSON.parse(user) : null);
  }

  isLoggedIn(): boolean {
    !!localStorage.getItem('authToken');
    return this.loggedIn;
  }

  logout(): void {
    // Implement your logout logic here
    this.loggedIn = false;
    this.currentUser = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isDoctor(): boolean {
   
    if (this.currentUser === "doctor") {
      return true;
    }
    return false;
  }

}