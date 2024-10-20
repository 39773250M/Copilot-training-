import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  constructor(private http: HttpClient) { }

  login(userData: { username: string, password: string }): Observable<any> {
    return this.http.get<any[]>(`http://localhost:3000/users?username=${userData.username}`).pipe(
      map((users: any[]) => {
        const user = users.find(u => u.password === userData.password);
        if (user) {
          this.loggedIn = true;
          return { success: true, message: 'Login successful' };
        } else {
          return { success: false, message: 'Invalid username or password' };
        }
      })
    );
  }

  logout(): void {
    this.loggedIn = false;
  }
}