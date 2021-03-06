import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateClient } from 'src/app/core/enums/state-client';
import { Client } from 'src/app/core/models/client';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss'],
})
export class FormClientComponent implements OnInit {
  public form!: FormGroup;
  public states = Object.values(StateClient);
  @Input() init = new Client();
  @Output() submited = new EventEmitter<Client>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.init.id],
      name: [this.init.name, [Validators.required, Validators.minLength(2)]],
      email: [
        this.init.email,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      total_ca_ht: [this.init.total_ca_ht],
      taux_tva: [this.init.taux_tva],
      state: [this.init.state],
    });
  }

  public onSubmit() {
    this.submited.emit(this.form.value);
  }
}
