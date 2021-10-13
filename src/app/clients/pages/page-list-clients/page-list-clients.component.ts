import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StateClient } from 'src/app/core/enums/state-client';
import { Client } from 'src/app/core/models/client';
import { ColClientsService } from 'src/app/core/services/col-clients.service';

@Component({
  selector: 'app-page-list-clients',
  templateUrl: './page-list-clients.component.html',
  styleUrls: ['./page-list-clients.component.scss']
})
export class PageListClientsComponent implements OnInit {

  public collection$: Observable<Client[]>;
  public states = Object.values(StateClient);
  public entetes: string[];
  
  constructor(private clientService: ColClientsService, private router: Router) {
    this.collection$ = this.clientService.collection;
    this.entetes = [
      'Action',
      'Name',
      'Email',
      'Total CA HT',
      'Taux TVA',
      'Total CA TTC',
      'State'
    ]
  }

  ngOnInit(): void {
  }

  public changeState(item: Client, event: any): void {
    const state = event.target.value;
    this.clientService.changeState(item, state).subscribe(
      (data) => {
        Object.assign(item, data);
      }
    )
  }

  public goToEdit(id: number): void {
    this.router.navigate(['list-clients', 'edit-client', id]);
  }

  public deleteItem(id: number): void {
    this.clientService.delete(id).subscribe();
  }

}
