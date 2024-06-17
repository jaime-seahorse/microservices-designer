import { Injectable } from '@angular/core';
import { PrintBoundedContextsResponse } from './print-bounded-contexts-response.dto';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { StorageService } from '../../../resources/storage/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrintBoundedContextsService {

	apiURL: string = 'http://localhost:3000/api/v1/bounded-contexts';

  constructor(
		private httpClient: HttpClient,
		private storageService: StorageService
	) { }

	getBoundedContextsByUserId(): Observable<HttpResponse<PrintBoundedContextsResponse>> {
		let projectId = this.storageService.getItem("ProjectId") as number;
		let accessToken = this.storageService.getItem("AccessToken") as string;

		return this.httpClient.get<PrintBoundedContextsResponse>(`${this.apiURL}/${projectId}`,
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
