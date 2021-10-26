import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../models/user';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public currentUser!: User;
  public title!: string;
  constructor(
    private authService: AuthenticateService,
    private router: Router,
    private translate: TranslateService
  ) { 
    this.authService.currentUser$.subscribe(
      (user) => {
        this.currentUser = user;
      }
    )
  }

  ngOnInit(): void {
    this.translate.get('Home.WelcomeText').subscribe(
      (val) => {
        this.title = val;
      }
    )

    // this.translate.get(['Home.WelcomeText', 'Home.WelcomeTextLogged'],
    // {username: this.currentUser.username}
    // ).subscribe(
    //   (obj) => {
    //     this.title = obj['Home.WelcomeText'];
    //   }
    // )
  }

  public changeLanguage(language: string) {
    this.translate.use(language);
  }
  public logout() {
    this.authService.logout();
    this.router.navigate(['sign-in'])
  }

}
