import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MyErrorStateMatcher } from 'src/app/ng/validation';
import { ConfirmSignUp } from 'src/app/openapi/confirmSignUp';
import { SignUp } from 'src/app/openapi/signUp';
import { AuthApiService, ConfirmationCodeMismatch, UserAlreadyExists } from '../auth.api.service'


function passwordRepeatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
      const passwordControl = control.root.get('password')
      if (passwordControl !== null && passwordControl.value != control.value) {
      return {unmatched: true}
      }
      return null
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordRepeat: new FormControl('', [Validators.required, passwordRepeatValidator()]),
  });

  confirmationForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.min(1000)]),
  });

  errMatcher = new MyErrorStateMatcher();

  authConfirmationToken: string | null = null;

  loading = false

  constructor(
    private readonly authService: AuthApiService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  async submitConfirmation() {
    if (this.confirmationForm.invalid) {
      return
    }

    this.loading = true;

    const payload: ConfirmSignUp = {
      token: this.authConfirmationToken as string,
      code: String(this.confirmationForm.get('code')?.value),
    }

    try {
      await firstValueFrom(this.authService.confirmSignUp(payload))
      this.router.navigate(['/sign-in'])
    } catch (e) {
      if (e instanceof ConfirmationCodeMismatch) {
        this.snackBar.open("Code mismatched");
      } else {
        this.snackBar.open("Something went wrong...");
      }
    }

    this.loading = false;
  }

  async submit() {
    if (this.form.invalid) {
      return
    }

    this.loading = true;

    try {
      const payload: SignUp = {
        name: this.form.get('name')?.value as string,
        email: this.form.get('email')?.value as string,
        password: this.form.get('password')?.value as string,
      }

      const result = await firstValueFrom(this.authService.signUp(payload))

      this.authConfirmationToken = result.token;
    } catch(e) {
      if (e instanceof UserAlreadyExists) {
        const data: SignupDialogData = {
          userAlreadyExists: true,
        }

        this.dialog.open(SignupDialog, {
          width: '300px',
          data: data,
        });
 
      } else {
        this.snackBar.open("Something went wrong...");
      }
    }

    this.loading = false;
  }
}

interface SignupDialogData {
  userAlreadyExists?: boolean
}

@Component({
  selector: 'signup-dialog',
  templateUrl: 'signup-dialog.component.html',
})
export class SignupDialog {
  constructor(
    private readonly dialogRef: MatDialogRef<SignupDialog>,
    @Inject(MAT_DIALOG_DATA) public readonly data: SignupDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}