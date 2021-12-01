import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

  public registerForm!: FormGroup;
  @Output() submitted: EventEmitter<any> = new EventEmitter();
  @Input() user = new User();
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required]
    });
  }

  get fields() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted.emit(this.registerForm.value);
  }

}
