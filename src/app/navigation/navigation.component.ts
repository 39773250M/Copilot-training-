import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../src/services/auth/auth.service'; // Import the AuthService

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  currentUser: string= ''; // Replace 'any' with the actual type of your user data

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(
      (user: any) => (user1: any) => {
        if(user1){
          console.log('currentUser:', user1);
          this.currentUser = user1;
      }
    },
      (error: Error) => console.error(error)
    );
  }

  onLogout(): void {
    this.authService.logout();
  }

  isDoctor(): boolean {
    return this.authService.isDoctor();
  }
}
