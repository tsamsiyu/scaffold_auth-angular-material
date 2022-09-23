import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/common/validation';
import { AuthApiService } from '../auth.api.service';


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

  constructor(private readonly authService: AuthApiService) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.authService.signIn({
      email: this.form.get('email')?.value as string,
      password: this.form.get('password')?.value as string,
    })
  }

}
