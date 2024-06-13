import { TestBed } from '@angular/core/testing';

import { CreateProjectService } from './create-project.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Project } from './project.dto';
import { CreateProjectResponse } from './create-project-response.dto';

describe('CreateProjectService', () => {
  let createProjectService: CreateProjectService;
	let httpTestController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
    createProjectService = TestBed.inject(CreateProjectService);
		httpTestController = TestBed.inject(HttpTestingController);
  });

	afterEach(() => {
		httpTestController.verify();
	});

  it('should be created', () => {
    expect(createProjectService).toBeTruthy();
  });

	it('should create a new project', () => {
		localStorage.setItem("AccessToken", JSON.stringify('aaaaaa.bbbbbb.cccccc'));

		let newProject: Project = {
			projectId: 1,
			projectName: 'Project 1'
		};

		let mockCreateProjectResponse: CreateProjectResponse = {
			message: 'Project created successfully'
		};

		let creationMessage: string = '';
		
		createProjectService.createProject(newProject)?.subscribe((response) => {
			creationMessage = response.body?.message!;
		});
		let mockRequest = httpTestController.expectOne(createProjectService.apiURL);
		mockRequest.flush(mockCreateProjectResponse);
		expect(creationMessage).toBe(mockCreateProjectResponse.message);
	});
});
