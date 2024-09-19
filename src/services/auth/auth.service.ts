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
        console.log('Login successful 00', users);
        if (users.length > 0 && users[0].password === password) {
          console.log('Login successful 11');
          this.loggedIn = true;
          this.currentUser = users[0];
          return users;
        } else {
          throw new Error('Invalid username/password');
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