import { Injectable } from '@angular/core';
import { Project } from './project.dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CreateProjectResponse } from './create-project-response.dto';
import { StorageService } from '../../../../resources/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CreateProjectService {

	readonly apiURL: string = 'http://localhost:3000/api/v1/projects';

	constructor(
		private httpClient: HttpClient,
		private storageService: StorageService	
	) { }	

	createProject(newProject: Project): Observable<HttpResponse<CreateProjectResponse>> {
		let accessToken = this.storageService.getItem("AccessToken") as string;

		return this.httpClient.post<CreateProjectResponse>(this.apiURL,
			newProject
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
