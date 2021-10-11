import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.scss'],
})
export class TabListComponent implements OnInit {
  @Input() headers!: string[];
  constructor() {}

  test() {
    // this.cd.detectChanges();
    console.log('click tab');
  }

  ngOnInit(): void {}
}
