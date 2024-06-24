import { Injectable } from '@angular/core';
import { SignInRequest } from './sign-in-request.dto';
import { SignInResponse } from './sign-in-response.dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MakeSignInService {

  readonly apiURL: string = 'http://localhost:3001/api';

  constructor(private httpClient: HttpClient) { }

	signInUser(userData: SignInRequest): Observable<HttpResponse<SignInResponse>> {
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
}
