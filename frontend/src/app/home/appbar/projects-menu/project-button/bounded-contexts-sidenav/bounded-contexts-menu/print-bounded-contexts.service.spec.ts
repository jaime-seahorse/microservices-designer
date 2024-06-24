import { TestBed } from '@angular/core/testing';

import { PrintBoundedContextsService } from './bounded-context-button/print-bounded-contexts.service';
import { PrintBoundedContextsResponse } from '../bounded-context-button/bounded-contexts-list-response.dto';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PrintBoundedContextsService', () => {
  let printBoundedContextsService: PrintBoundedContextsService;
	let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
    printBoundedContextsService = TestBed.inject(PrintBoundedContextsService);
    httpTestController = TestBed.inject(HttpTestingController);
  });

	afterEach(() => {
		httpTestController.verify();
	});

  it('should be created', () => {
    expect(printBoundedContextsService).toBeTruthy();
  });

	it('should retrieve the bounded contexts from a specific project', () => {
		localStorage.setItem("ProjectId", JSON.stringify('1'));
		localStorage.setItem("AccessToken", JSON.stringify('aaaaaa.bbbbbb.cccccc'));

		let mockProjects: PrintBoundedContextsResponse = [
			{id: 1, name: 'Bounded Context 1'},
 			{id: 2, name: 'Bounded Context 2'},
		];
		let mockGetProjects: PrintBoundedContextsResponse = [];
		
		printBoundedContextsService.getBoundedContextsByUserId()?.subscribe((response) => {
			mockGetProjects = response.body!;
		});
		let mockRequest = httpTestController.expectOne(`${printBoundedContextsService.apiURL}/1`);
		mockRequest.flush(mockProjects);
		expect(mockGetProjects).toEqual(mockProjects);
	});
});
