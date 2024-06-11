import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

import {
  SignInRequest,
  LogInRequest,
  // ForgotPasswordRequest,
  // SignOutRequest,
  SignInResponse,
  LogInResponse,
  LogOutResponse,
  // ForgotPasswordResponse,
  // SignOutResponse
} from './auth.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly apiURL: string = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {}

  SignInUser(userData: SignInRequest): Observable<HttpResponse<SignInResponse>> {
    return this.httpClient.post<SignInResponse>(
      `${this.apiURL}/signin`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        observe: 'response' as const,
      }
    );
  }

  logInUser(userData: LogInRequest): Observable<HttpResponse<LogInResponse>> {
    return this.httpClient.post<LogInResponse>(
      `${this.apiURL}/login`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        observe: 'response' as const,
      }
    );
  }

  logOutUser(token: string): Observable<HttpResponse<LogOutResponse>> {
    return this.httpClient.post<LogOutResponse>(`${this.apiURL}/logout`, null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      observe: 'response' as const,
    });
  }

  // resetPassword(userData: ForgotPasswordData): Observable<ForgotPasswordResponse> {
  // 	return this.httpClient.put<ForgotPasswordResponse>(`${this.apiURL}/forgotpassword`, userData);
  // }

  // signOutUser(userData: SignOutData): Observable<SignOutResponse> {
  // 	return this.httpClient.post<SignOutResponse>(`${this.apiURL}/signout`, userData);
  // }
}
