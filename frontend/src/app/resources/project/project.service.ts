import { Injectable } from '@angular/core';
import { CreateProjectRequest, CreateProjectResponse,GetProjectsResponse, Project } from './project.dto';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

	readonly apiURL: string = 'http://localhost:3000/api/v1/projects';

  constructor(
		private httpClient: HttpClient,
		private storageService: StorageService	
	) { }

	getProjectsByUserId(): Observable<HttpResponse<GetProjectsResponse>> {
		let userId = this.storageService.getItem("UserId") as number;
		let accessToken = this.storageService.getItem("AccessToken") as string;

		return this.httpClient.get<GetProjectsResponse>(`${this.apiURL}/${userId}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${accessToken}`
				},
				observe: 'response' as const,
			}
		);
	}

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
