import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/core/models/client';
import { ColClientsService } from 'src/app/core/services/col-clients.service';

@Component({
  selector: 'app-page-add-client',
  templateUrl: './page-add-client.component.html',
  styleUrls: ['./page-add-client.component.scss']
})
export class PageAddClientComponent implements OnInit {

  constructor(
    private clientService: ColClientsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public add(item: Client) {
    this.clientService.add(item).subscribe(
      () => {
        this.router.navigate(['list-clients']);
      }
    )
  }
}
