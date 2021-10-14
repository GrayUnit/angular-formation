import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthentificationService } from '../../services/authentification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public currentUser!: User;
  
  constructor(
    private authService: AuthentificationService,
    private router: Router,
    private translate: TranslateService,
  ) { 
    this.authService.currentUser$.subscribe(
      (user) => this.currentUser = user
    );
  }

  ngOnInit(): void {
  }

  public changeLanguage(language: string) {
    this.translate.use(language);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
