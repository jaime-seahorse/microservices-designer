import { Injectable } from '@angular/core';
import { CreateBoundedContextRequest } from './create-bounded-context-request.dto';
import { CreateBoundedContextResponse } from './create-bounded-context-response.dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateBoundedContextService {

	apiURL: string = 'http://localhost:3000/api/v1/bounded-contexts';

  constructor(
		private httpClient: HttpClient,
	) { }

	createBoundedContext(newBoundedContext: CreateBoundedContextRequest): Observable<HttpResponse<CreateBoundedContextResponse>> {

		return this.httpClient.post<CreateBoundedContextResponse>(this.apiURL,
			newBoundedContext
		,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				observe: 'response' as const,
			}
		);
	}
}
