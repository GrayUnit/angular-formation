import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-redirect',
  templateUrl: './btn-redirect.component.html',
  styleUrls: ['./btn-redirect.component.scss'],
})
export class BtnRedirectComponent implements OnInit {
  public route: string;
  public label: string;
  constructor() {
    // mock variables
    this.route = 'test';
    this.label = 'mon text';
  }

  ngOnInit(): void {}
}
