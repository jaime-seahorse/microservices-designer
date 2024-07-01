import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogInRequest } from './do-login-request.dto';
import { LogInResponse } from './do-login-response.dto';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

	readonly apiURL: string = 'http://localhost:3001/api';

  constructor(private httpClient: HttpClient) { }

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
}
