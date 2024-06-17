import { Injectable } from '@angular/core';
import { CreateBoundedContextRequest } from './create-bounded-context-request.dto';
import { CreateBoundedContextResponse } from './create-bounded-context-response.dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { StorageService } from '../../../resources/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CreateBoundedContextService {

	apiURL: string = 'http://localhost:3000/api/v1/bounded-contexts';

  constructor(
		private httpClient: HttpClient,
		private storageService: StorageService
	) { }

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
