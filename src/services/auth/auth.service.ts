import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false; // Add this line
  private currentUser: any;
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

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

  getCurrentUser(): any {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    // Implement your logout logic here
    this.loggedIn = false;
    this.currentUser = null;
  }
}