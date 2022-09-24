import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, TitleStrategy } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MyErrorStateMatcher } from 'src/app/ng/validation';
import { SignIn } from 'src/app/openapi/signIn';
import { AuthTokenManagerService } from 'src/app/services/auth-token-manager.service';
import { AuthApiService, UserUnauthorized } from '../auth.api.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  errMatcher = new MyErrorStateMatcher();

  loading = false;

  constructor(
    private readonly authService: AuthApiService,
    private readonly authTokenManager: AuthTokenManagerService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  async submit() {
    if (this.form.invalid) {
      return
    }

    var payload: SignIn = {
      email: this.form.get('email')?.value as string,
      password: this.form.get('password')?.value as string,
    };

    this.loading = true

    const observable = this.authService.signIn(payload);
    try {
      const signedIn = await firstValueFrom(observable);
      this.authTokenManager.saveToken(signedIn.token);
      location.reload();
    } catch (e) {
      if (e instanceof UserUnauthorized) {
        this.snackBar.open(e.message);
      } else {
        this.snackBar.open("Something went wrong...");
      }
    }

    this.loading = false;
  }

}
