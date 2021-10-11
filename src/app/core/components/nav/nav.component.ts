import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
    private authService: AuthenticationService,
    private translate: TranslateService
  ) {
    this.authService.currentUser$.subscribe(
      (user) => this.currentUser = user
    );
  }

  public changeLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit(): void {}

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  check() {
    console.log('CD NAV');
  }

}
