import { Injectable } from '@angular/core';
import { BoundedContext, CreateBoundedContextRequest, CreateBoundedContextResponse, GetBoundedContextsResponse } from './bounded-context.dto';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { StorageService } from '../resources/storage/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoundedContextService {

	apiURL: string = 'http://localhost:3000/api/v1/bounded-contexts';

  constructor(
		private httpClient: HttpClient,
		private storageService: StorageService
	) { }

	getBoundedContextsByUserId(): Observable<HttpResponse<GetBoundedContextsResponse>> {
		let projectId = this.storageService.getItem("ProjectId") as number;
		let accessToken = this.storageService.getItem("AccessToken") as string;

		return this.httpClient.get<GetBoundedContextsResponse>(`${this.apiURL}/${projectId}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${accessToken}`
				},
				observe: 'response' as const,
			}
		);
	}

	createBoundedContext(newBoundedContext: CreateBoundedContextRequest): Observable<HttpResponse<CreateBoundedContextResponse>> {
		let accessToken = this.storageService.getItem("AccessToken") as string;

		return this.httpClient.post<CreateBoundedContextResponse>(this.apiURL,
			newBoundedContext
		,
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${accessToken}`
				},
				observe: 'response' as const,
			}
		);
	}
}
