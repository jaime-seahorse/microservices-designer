import { TestBed } from '@angular/core/testing';

import { BoundedContextService } from './bounded-context.service';
// import { Items } from '../../resources/storage/storage.service';
import { BoundedContext, GetBoundedContextsResponse } from './bounded-context.dto';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BoundedContextService', () => {
  let boundedContextService: BoundedContextService;
	let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
    boundedContextService = TestBed.inject(BoundedContextService);
    httpTestController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(boundedContextService).toBeTruthy();
  });

	it('should retrieve the bounded contexts from a specific project', () => {
		localStorage.setItem("ProjectId", JSON.stringify('1'));
		localStorage.setItem("AccessToken", JSON.stringify('aaaaaa.bbbbbb.cccccc'));

		let mockProjects: GetBoundedContextsResponse = [
			{boundedContextId: 1, boundedContextName: 'Bounded Context 1'},
 			{boundedContextId: 2, boundedContextName: 'Bounded Context 2'},
		];
		let mockGetProjects: GetBoundedContextsResponse = [];
		
		boundedContextService.getBoundedContextsByUserId()?.subscribe((response) => {
			mockGetProjects = response.body!;
		});
		let mockRequest = httpTestController.expectOne(`${boundedContextService.apiURL}/1`);
		mockRequest.flush(mockProjects);
		expect(mockGetProjects).toEqual(mockProjects);
	});

	it('should create a new bounded context', () => {
		localStorage.setItem("AccessToken", JSON.stringify('aaaaaa.bbbbbb.cccccc'));
		let creationMessage: string = '';
		let boundedContext: BoundedContext = {
			boundedContextId: 1,
			boundedContextName: 'Bounded Context 1'
		};
		boundedContextService.createBoundedContext(boundedContext)?.subscribe((response) => {
			creationMessage = response.body?.message!;
		});
		let mockRequest = httpTestController.expectOne(boundedContextService.apiURL);
		mockRequest.flush({message: 'Bounded context created successfully'});
		expect(creationMessage).toBe('Bounded context created successfully');
	});
});
