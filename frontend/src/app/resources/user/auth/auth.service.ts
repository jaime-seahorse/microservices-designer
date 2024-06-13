// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { HttpClient, HttpResponse } from '@angular/common/http';

// import {
//   // SignInRequest,
//   // ForgotPasswordRequest,
//   // SignOutRequest,
//   // SignInResponse,
//   LogOutResponse,
//   // ForgotPasswordResponse,
//   // SignOutResponse
// } from './auth.dto';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   readonly apiURL: string = 'http://localhost:3001/api';

//   constructor(private httpClient: HttpClient) {}

//   logOutUser(token: string): Observable<HttpResponse<LogOutResponse>> {
//     return this.httpClient.post<LogOutResponse>(`${this.apiURL}/logout`, null, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       observe: 'response' as const,
//     });
//   }

//   // resetPassword(userData: ForgotPasswordData): Observable<ForgotPasswordResponse> {
//   // 	return this.httpClient.put<ForgotPasswordResponse>(`${this.apiURL}/forgotpassword`, userData);
//   // }

//   // signOutUser(userData: SignOutData): Observable<SignOutResponse> {
//   // 	return this.httpClient.post<SignOutResponse>(`${this.apiURL}/signout`, userData);
//   // }
// }
