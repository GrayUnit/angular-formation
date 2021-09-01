import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.scss'],
})
export class TabListComponent implements OnInit {
  public headers: string[];
  public datas: any[];
  constructor() {
    // mock variables
    this.headers = ['header1', 'header2', 'header3'];
    this.datas = [
      { type: 'formation', client: 'Betclic', tjm: 1200, state: 'OPTION' },
      { type: 'formation', client: 'Betclic', tjm: 1200, state: 'OPTION' },
    ];
  }

  ngOnInit(): void {}
}
