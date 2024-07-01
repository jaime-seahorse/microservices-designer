import { Injectable } from '@angular/core';
import { Project } from './project.dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CreateProjectResponse } from './create-project-response.dto';

@Injectable({
  providedIn: 'root'
})
export class CreateProjectService {

	readonly apiURL: string = 'http://localhost:3000/api/v1/projects';

	constructor(
		private httpClient: HttpClient,
	) { }	

	createProject(newProject: Project): Observable<HttpResponse<CreateProjectResponse>> {
		return this.httpClient.post<CreateProjectResponse>(this.apiURL,
			newProject
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
