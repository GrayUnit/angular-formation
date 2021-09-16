import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss'],
})
export class UiComponent implements OnInit {
  public open = true;
  constructor() {}
  check() {
    console.log('CD UI');
  }
  test() {
    console.log('test');
  }

  ngOnInit(): void {}

  /**
   * function to open or close nav
   */
  public toggle(): void {
    this.open = !this.open;
  }
}
