import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-redirect',
  templateUrl: './btn-redirect.component.html',
  styleUrls: ['./btn-redirect.component.scss'],
})
export class BtnRedirectComponent implements OnInit {
  @Input() route!: string;
  @Input() label!: string;
  constructor() {}

  ngOnInit(): void {}
}
