import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public title!: string;
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.get('Home.WelcomeText').subscribe(
      (val) => { 
        this.title = val;
      }
    )
    // this.translate.get(['Home.WelcomeText', 'Home.WelcomeTextLogged'], {'username': 'username'})
    // .subscribe(
    //   (val) => { 
    //     this.title = val["Home.WelcomeText"];
    //   }
    // )
  }
}
