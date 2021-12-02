import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateOrder } from 'src/app/core/enums/state-order';
import { Order } from 'src/app/core/models/order';

@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormOrderComponent implements OnInit {
  public form!: FormGroup;
  public states = Object.values(StateOrder);
  @Input() init = new Order();
  @Output() submited = new EventEmitter<Order>();
  // doit être un event
  // doit être un observable d'rxjs
  // ne doit pas être initialisé avec un flux de data lorsque vous le crééz
  // doit être un observable avec le comportement chaud
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.init.id],
      type: [this.init.type],
      client: [this.init.client, Validators.minLength(10)],
      taux_tva: [this.init.taux_tva],
      comment: [this.init.comment],
      nb_days: [this.init.nb_days],
      tjm_ht: [this.init.tjm_ht],
      state: [this.init.state],
    });
  }

  public onSubmit() {
//    this.cd.detechChanges();
    this.submited.emit(this.form.value);
  }

  public check() {
    console.log("CD Form Order");
  }
}
