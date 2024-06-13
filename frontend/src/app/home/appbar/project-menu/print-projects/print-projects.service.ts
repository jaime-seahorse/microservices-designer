import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrintProjectsResponse } from './print-projects-response.dto';
import { StorageService } from '../../../../resources/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PrintProjectsService {

	readonly apiURL: string = 'http://localhost:3000/api/v1/projects';

  constructor(
		private httpClient: HttpClient,
		private storageService: StorageService
	) { }

	getProjectsByUserId(): Observable<HttpResponse<PrintProjectsResponse>> {
		let userId = this.storageService.getItem("UserId") as number;
		let accessToken = this.storageService.getItem("AccessToken") as string;

		return this.httpClient.get<PrintProjectsResponse>(`${this.apiURL}/${userId}`,
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
