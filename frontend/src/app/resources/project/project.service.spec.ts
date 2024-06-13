import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { GetProjectsResponse, Project } from './project.dto';
// import { Items } from '../storage/storage.service';

describe('ProjectService', () => {
  let projectService: ProjectService;
	let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
    projectService = TestBed.inject(ProjectService);
    httpTestController = TestBed.inject(HttpTestingController);
  });

	afterEach(() => {
		httpTestController.verify();
	});

  it('should be created', () => {
    expect(projectService).toBeTruthy();
  });

	it('should retrieve the projects by user id', () => {
		localStorage.setItem("UserId", JSON.stringify('1'));
		localStorage.setItem("AccessToken", JSON.stringify('aaaaaa.bbbbbb.cccccc'));

		let mockProjects: GetProjectsResponse = [
			{projectId: 1, projectName: 'Project 1'},
			{projectId: 2, projectName: 'Project 2'},
		];
		let mockGetProjects: GetProjectsResponse = [];
		
		projectService.getProjectsByUserId().subscribe((response) => {
			mockGetProjects = response.body!;
		});
		let mockRequest = httpTestController.expectOne(`${projectService.apiURL}/1`);
		mockRequest.flush(mockProjects);
		expect(mockGetProjects).toEqual(mockProjects);
	});

	it('should create a new project', () => {
		localStorage.setItem("AccessToken", JSON.stringify('aaaaaa.bbbbbb.cccccc'));
		let creationMessage: string = '';
		let project: Project = {
			projectId: 1,
			projectName: 'Project 1'
		};
		projectService.createProject(project)?.subscribe((response) => {
			creationMessage = response.body?.message!;
		});
		let mockRequest = httpTestController.expectOne(projectService.apiURL);
		mockRequest.flush({message: 'Project created successfully'});
		expect(creationMessage).toBe('Project created successfully');
	});
});
