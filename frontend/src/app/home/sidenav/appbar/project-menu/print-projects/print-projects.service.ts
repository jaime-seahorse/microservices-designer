import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrintProjectsResponse } from './print-projects-response.dto';

@Injectable({
  providedIn: 'root'
})
export class PrintProjectsService {

	readonly apiURL: string = 'http://localhost:3000/api/v1/projects';

  constructor(
		private httpClient: HttpClient,
	) { }

	getProjectsByUserId(): Observable<HttpResponse<PrintProjectsResponse>> {
		let userId = JSON.parse(localStorage.getItem("UserId")!) as number;

		return this.httpClient.get<PrintProjectsResponse>(`${this.apiURL}/${userId}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				observe: 'response' as const,
			}
		);
	}
}
