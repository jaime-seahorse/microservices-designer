import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

	apiURL: string = "http://localhost:3000/api/organizations";
	inProcess: boolean = false;

  constructor(private httpClient: HttpClient) { }

	getAllOrganizations(): Observable<Organization[]> {
		return this.httpClient.get<Organization[]>(this.apiURL);
	}

	createOrganization(newOrg: Organization): Observable<Organization> {
		return this.httpClient.post<Organization>(this.apiURL, newOrg);
	}

	getOrganizationById(orgId: number): Observable<Organization> {
		return this.httpClient.get<Organization>(`${this.apiURL}/${orgId}`);
	}

	updateOrganizationData(orgId: number, orgData: Organization): Observable<Organization> {
		return this.httpClient.put<Organization>(`${this.apiURL}/${orgId}`, orgData);
	}
}
