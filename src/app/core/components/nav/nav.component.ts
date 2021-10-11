import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  public currentUser!: User;
  
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.authService.currentUser$.subscribe(
      (user) => this.currentUser = user
    );
  }

  ngOnInit(): void {}

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
