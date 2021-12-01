import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/core/services/authentification.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {

  public loginForm!: FormGroup;
  public returnUrl!: string;
  
  constructor(
    private fb: FormBuilder,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthentificationService
  ) { 
    if(this.authService.currentUserValue) {
      this.router.navigate(['/list-orders']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.currentRoute.snapshot.queryParams['returnUrl'] || '/list-orders';
  }

  get fields() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.authService.login(
      this.fields.username.value,
      this.fields.password.value
    ).pipe(
      first()
    ).subscribe(
      (data) => {
        this.router.navigate([this.returnUrl]);
      }
    )
  }

}
