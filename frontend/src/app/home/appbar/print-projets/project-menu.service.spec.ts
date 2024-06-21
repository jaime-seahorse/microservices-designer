import { TestBed } from '@angular/core/testing';

import { PrintProjectsService } from './project-menu.service';
import { PrintProjectsResponse } from './print-projects-response.dto';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PrintProjectsService', () => {
  let printProjectsService: PrintProjectsService;
	let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
    printProjectsService = TestBed.inject(PrintProjectsService);
		httpTestController = TestBed.inject(HttpTestingController);
  });

	afterEach(() => {
		httpTestController.verify();
	});

  it('should be created', () => {
    expect(printProjectsService).toBeTruthy();
  });

	it('should retrieve the projects by user id', () => {
		localStorage.setItem("UserId", JSON.stringify('1'));
		localStorage.setItem("AccessToken", JSON.stringify('aaaaaa.bbbbbb.cccccc'));

		let mockProjectsToGet: PrintProjectsResponse = [
			{projectId: 1, projectName: 'Project 1'},
			{projectId: 2, projectName: 'Project 2'},
		];

		let mockGotProjects: PrintProjectsResponse = [];
		
		printProjectsService.getProjectsByUserId().subscribe((response) => {
			mockGotProjects = response.body!;
		});
		let mockRequest = httpTestController.expectOne(`${printProjectsService.apiURL}/1`);
		mockRequest.flush(mockProjectsToGet);
		expect(mockGotProjects).toEqual(mockProjectsToGet);
	});
});
