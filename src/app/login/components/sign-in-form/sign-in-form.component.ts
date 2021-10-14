import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/core/services/authentification.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit, OnDestroy {

  public loginForm!: FormGroup;
  public returnUrl!: string;
  public loading: boolean = false;
  public subscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthentificationService
  ) { 
    if(this.authService.currentUserValue) {
      this.router.navigate(['/list-orders']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.currentRoute.snapshot.queryParams['returnUrl'] || '/list-orders';
  }

  get fields() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.loading = true;
    this.subscription = this.authService.login(
      this.fields.username.value, 
      this.fields.password.value).pipe(
        first()
      ).subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
        },
        (err) => {
          this.loading = false;
        }
      )
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
