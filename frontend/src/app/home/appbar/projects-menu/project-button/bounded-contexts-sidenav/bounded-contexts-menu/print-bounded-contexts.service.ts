import { Injectable } from '@angular/core';
import { PrintBoundedContextsResponse } from './bounded-contexts-list-response.dto';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrintBoundedContextsService {

	apiURL: string = 'http://localhost:3000/api/v1/bounded-contexts';

  constructor(
		private httpClient: HttpClient,
	) { }

	getBoundedContextsByUserId(): Observable<HttpResponse<PrintBoundedContextsResponse>> {
		let projectId = JSON.parse(localStorage.getItem("ProjectId")!) as number;

		return this.httpClient.get<PrintBoundedContextsResponse>(`${this.apiURL}/${projectId}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				observe: 'response' as const,
			}
		);
	}
}
