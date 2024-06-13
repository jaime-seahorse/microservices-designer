import { TestBed } from '@angular/core/testing';

import { GetBoundedContextsService } from './get-bounded-contexts.service';
// import { Items } from '../../resources/storage/storage.service';
import { GetBoundedContextsResponse } from './get-bounded-contexts.dto';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GetBoundedContextsService', () => {
  let getBoundedContextsService: GetBoundedContextsService;
	let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
    getBoundedContextsService = TestBed.inject(GetBoundedContextsService);
    httpTestController = TestBed.inject(HttpTestingController);
  });

	afterEach(() => {
		httpTestController.verify();
	});

  it('should be created', () => {
    expect(getBoundedContextsService).toBeTruthy();
  });

	it('should retrieve the bounded contexts from a specific project', () => {
		localStorage.setItem("ProjectId", JSON.stringify('1'));
		localStorage.setItem("AccessToken", JSON.stringify('aaaaaa.bbbbbb.cccccc'));

		let mockProjects: GetBoundedContextsResponse = [
			{boundedContextId: 1, boundedContextName: 'Bounded Context 1'},
 			{boundedContextId: 2, boundedContextName: 'Bounded Context 2'},
		];
		let mockGetProjects: GetBoundedContextsResponse = [];
		
		getBoundedContextsService.getBoundedContextsByUserId()?.subscribe((response) => {
			mockGetProjects = response.body!;
		});
		let mockRequest = httpTestController.expectOne(`${getBoundedContextsService.apiURL}/1`);
		mockRequest.flush(mockProjects);
		expect(mockGetProjects).toEqual(mockProjects);
	});
});
