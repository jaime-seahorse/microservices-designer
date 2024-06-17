import { TestBed } from '@angular/core/testing';

import { CreateBoundedContextService } from './create-bounded-context.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreateBoundedContextRequest } from './create-bounded-context-request.dto';

describe('CreateBoundedContextService', () => {
  let createBoundedContextService: CreateBoundedContextService;
	let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
    createBoundedContextService = TestBed.inject(CreateBoundedContextService);
		httpTestController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(createBoundedContextService).toBeTruthy();
  });

	it('should create a new bounded context', () => {
		localStorage.setItem("AccessToken", JSON.stringify('aaaaaa.bbbbbb.cccccc'));
		let creationMessage: string = '';
		let boundedContext: CreateBoundedContextRequest = {
			name: 'Bounded Context 1'
		};
		createBoundedContextService.createBoundedContext(boundedContext)?.subscribe((response) => {
			creationMessage = response.body?.message!;
		});
		let mockRequest = httpTestController.expectOne(createBoundedContextService.apiURL);
		mockRequest.flush({message: 'Bounded context created successfully'});
		expect(creationMessage).toBe('Bounded context created successfully');
	});
});
