import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent, SignupDialog } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthApiService } from './auth.api.service'
import { HttpClientModule } from '@angular/common/http';
import { PublicSharedModule } from '../public-shared/public-shared.module';

const routes: Routes = [
  {
    path: "sign-in",
    component: SigninComponent,
  },
  {
    path: "sign-up",
    component: SignupComponent,
  }
];


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    SignupDialog,
  ],
  providers: [
    AuthApiService,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    PublicSharedModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatIconModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class LoginModule { }
