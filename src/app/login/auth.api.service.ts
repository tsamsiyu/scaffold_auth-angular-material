import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignIn } from '../openapi/signIn';
import { SignUp } from '../openapi/signUp'
import { ConfirmSignUp } from '../openapi/confirmSignUp'
import { SignUpResponse } from '../openapi/signUpResponse';

export class UserAlreadyExists extends Error {
    constructor() {
        super("User already exists")
        Object.setPrototypeOf(this, UserAlreadyExists.prototype);
    }
}

export class ConfirmationCodeMismatch extends Error {
    constructor() {
        super("Confirmation code is invalid")
        Object.setPrototypeOf(this, ConfirmationCodeMismatch.prototype);
    }
}

@Injectable()
export class AuthApiService {

    constructor(private readonly httpClient: HttpClient) {
    }

    signUp(payload: SignUp): Observable<SignUpResponse> {
        return new Observable(subscriber => {
            this.httpClient.post(environment.apiBaseUrl + "auth/sign-up", payload)
            .pipe(catchError(err => of(err)))
            .subscribe(val => {
                if (val instanceof HttpErrorResponse && val.status == 409) {
                    subscriber.error(new UserAlreadyExists())
                } else if (val instanceof HttpErrorResponse) {
                    subscriber.error(new Error("Something went wrong"))
                } else {
                    subscriber.next(val)
                }

                subscriber.complete()
            })
        })
    }

    confirmSignUp(payload: ConfirmSignUp): Observable<void> {
        return new Observable(subscriber => {
            this.httpClient.post(environment.apiBaseUrl + "auth/sign-up-confirm", payload)
            .pipe(catchError(err => of(err)))
            .subscribe(val => {
                if (val instanceof HttpErrorResponse) {
                    subscriber.error(new ConfirmationCodeMismatch())
                } else if (val instanceof HttpErrorResponse) {
                    subscriber.error(new Error("Something went wrong"))
                } else {
                    subscriber.next(val)
                }

                subscriber.complete()
            })
        })
    }

    signIn(payload: SignIn) {
        this.httpClient.post(environment.apiBaseUrl + "auth/sign-in", payload)
        .pipe(first())
        .pipe(catchError(err => of(err)))
        .subscribe(val => {
            console.log(val)


        })
    }

}