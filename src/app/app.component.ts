import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MSM Hospital';
  ngOnInit(): void {
    this.applyLightTheme();
  }

  applyLightTheme(): void {
    const head = document.head;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/light-theme.css'; // Adjust the path as necessary
    head.appendChild(link);
  }
}
