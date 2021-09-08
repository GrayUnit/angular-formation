import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/core/models/client';
import { ColClientsService } from 'src/app/core/services/col-clients.service';

@Component({
  selector: 'app-page-edit-client',
  templateUrl: './page-edit-client.component.html',
  styleUrls: ['./page-edit-client.component.scss'],
})
export class PageEditClientComponent implements OnInit {
  public item$!: Observable<Client>;
  constructor(
    private route: ActivatedRoute,
    private clientsService: ColClientsService,
    private router: Router
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.item$ = this.clientsService.getItemById(id);
    });
  }

  ngOnInit(): void {}

  public update(item: Client): void {
    this.clientsService.update(item).subscribe((res) => {
      this.router.navigate(['list-clients']);
    });
  }
}
