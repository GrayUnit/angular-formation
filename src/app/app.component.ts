import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public title = 'crm-betclic';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
  }

  public check() {
    console.log("CD APP.COMPONENT")
  }
}
