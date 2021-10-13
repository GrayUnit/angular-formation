import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StateClient } from 'src/app/core/enums/state-client';
import { Client } from 'src/app/core/models/client';


@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})
export class FormClientComponent implements OnInit {

  public form!: FormGroup;
  public states = Object.values(StateClient);
  @Input() init = new Client();
  @Output() submitted: EventEmitter<Client> = new EventEmitter<Client>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.init.id],
      name: [this.init.name],
      email: [this.init.email],
      total_ca_ht: [this.init.total_ca_ht],
      taux_tva: [this.init.taux_tva],
      state: [this.init.state]
    });
  }


  public onSubmit() {
    this.submitted.emit(this.form.value);
  }

}
