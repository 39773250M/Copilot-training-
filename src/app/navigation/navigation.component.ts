import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../src/services/auth/auth.service'; // Import the AuthService

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.authService.logout();
  }

}
