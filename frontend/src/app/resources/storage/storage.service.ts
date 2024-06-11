import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TokenResponse {
  accessToken: string
}

interface Credentials {
  email: string,
  password: string
}

export enum Items {
  AccessToken = 'AccessToken',
  Credentials = 'Credentials',
  UserId = 'UserId',
  ProjectId = 'ProjectId',
  BoundedContextId = 'BoundedContextId',
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  readonly apiURL: string = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {}

  setAccessToken(newAccessToken: string): void {
    localStorage.setItem(Items.AccessToken, JSON.stringify(newAccessToken));
  }

  getAccessToken(): string | null {
    return JSON.parse(localStorage.getItem(Items.AccessToken)!) as string ?? null;
  }

  refreshAccessToken(): Observable<TokenResponse> | null {
    if (this.getCredentials()) {
      return this.httpClient.post<TokenResponse>(
        `${this.apiURL}/token`,
        JSON.stringify(this.getCredentials()),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    return null;
  }

  setCredentials(newEmail: string, newPassword: string): void {
    localStorage.setItem(Items.Credentials, JSON.stringify({
      email: newEmail,
      password: newPassword
    }));
  }

  getCredentials(): Credentials | null {
    return JSON.parse(localStorage.getItem(Items.Credentials)!) as Credentials ?? null;
  }

  setItem(itemName: Items | string, itemValue: number): void {
    localStorage.setItem(itemName, JSON.stringify(itemValue));
  }

  getItem(itemName: Items | string) {
    return JSON.parse(localStorage.getItem(itemName)!) ?? null;
  }

  cleanItems(): void {
    for (let item in Items) localStorage.removeItem(item);
  }
}
