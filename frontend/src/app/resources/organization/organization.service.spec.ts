// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';
// import { HttpTestingController } from '@angular/common/http/testing';
// import { HttpErrorResponse } from '@angular/common/http';

// import { OrganizationService } from './organization.service';
// import { Organization } from './interfaces';

// describe('UserService', () => {
// 	let organizationService: OrganizationService;
// 	let httpTestController: HttpTestingController;
// 	let mockRequest: TestRequest;
// 	let httpError: HttpErrorResponse;
// 	let mockOrganization: Organization;

// 	beforeEach(() => {
// 		TestBed.configureTestingModule({
// 			imports: [HttpClientTestingModule],
// 		});
// 		organizationService = TestBed.inject(OrganizationService);
// 		httpTestController = TestBed.inject(HttpTestingController);
// 	});

// 	afterEach(() => {
// 		httpTestController.verify();
// 	})

// 	it('should be created', () => {
// 		expect(organizationService).toBeTruthy();
// 	});

// 	it('should return every organization', () => {
// 		let mockOrganizationArray: Organization[] = [];
// 		let mockOrganizationsToReturn: Organization[] = [
// 			{
// 				id: 1,
// 				name: "Organization 1"
// 			},
// 			{
// 				id: 2,
// 				name: "Organization 2"
// 			},
// 		];

// 		organizationService.getAllOrganizations().subscribe((organizations) => {
// 			mockOrganizationArray = organizations;
// 		});

// 		mockRequest = httpTestController.expectOne(organizationService.apiURL);
// 		expect(mockRequest.request.method).toEqual("GET");
// 		mockRequest.flush(mockOrganizationsToReturn);
// 		expect(mockOrganizationArray).toEqual(mockOrganizationsToReturn);
// 	});

// 	it('should be able to handle errors when trying to return every organization', () => {
// 		organizationService.getAllOrganizations().subscribe({
// 			next: () => fail("Error thrown"),
// 			error: (err: HttpErrorResponse) => httpError = err
// 		});

// 		mockRequest = httpTestController.expectOne(organizationService.apiURL);
// 		mockRequest.flush('Server error', {
// 			status: 403,
// 			statusText: 'Access denied'
// 		} as HttpErrorResponse);

// 		if(!httpError)
// 			throw new Error("Errors can't be handled correctly when trying to return every organization");

// 		expect(httpError.status).toEqual(403);
// 		expect(httpError.statusText).toEqual("Access denied");
// 	});

// 	it('should create a new organization', () => {
// 		let mockOrganizationToCreate: Organization = {
// 			id: 1,
// 			name: "Organization 1"
// 		};

// 		organizationService.createOrganization(mockOrganizationToCreate).subscribe((newOrg) => {
// 			mockOrganization = newOrg;
// 		});

// 		mockRequest = httpTestController.expectOne(organizationService.apiURL);
// 		expect(mockRequest.request.method).toEqual("POST");
// 		mockRequest.flush(mockOrganizationToCreate);
// 		expect(mockOrganization).toEqual(mockOrganizationToCreate);
// 	});

// 	it('should be able to handle errors when trying to create a new organization', () => {
// 		let mockOrganizationToCreate: Organization = {
// 			id: 1,
// 			name: "Organization 1"
// 		};

// 		organizationService.createOrganization(mockOrganizationToCreate).subscribe({
// 			next: () => fail("Error thrown"),
// 			error: (err: HttpErrorResponse) => httpError = err
// 		});

// 		mockRequest = httpTestController.expectOne(organizationService.apiURL);
// 		mockRequest.flush('Server error', {
// 			status: 403,
// 			statusText: 'Access denied'
// 		} as HttpErrorResponse);

// 		if (!httpError)
// 			throw new Error("Errors can't be handled correctly");
		
// 		expect(httpError.status).toEqual(403);
// 		expect(httpError.statusText).toEqual("Access denied");
// 	});

// 	it('should return an organization by id', () => {
// 		let mockOrganizationToReturn: Organization = {
// 			id: 1,
// 			name: "Organization 1"
// 		};
// 		let organizationId = mockOrganizationToReturn.id;

// 		organizationService.getOrganizationById(organizationId).subscribe((orgById) => {
// 			mockOrganization = orgById;
// 		});

// 		mockRequest = httpTestController.expectOne(`${organizationService.apiURL}/${organizationId}`);
// 		expect(mockRequest.request.method).toEqual("GET");
// 		mockRequest.flush(mockOrganizationToReturn);
// 		expect(mockOrganization).toEqual(mockOrganizationToReturn);
// 	});

// 	it('should be able to handle errors when trying to get an organization by id', () => {
// 		let mockOrganizationToReturn: Organization = {
// 			id: 1,
// 			name: "Organization 1"
// 		};
// 		let organizationId = mockOrganizationToReturn.id;

// 		organizationService.getOrganizationById(organizationId).subscribe({
// 			next: () => fail("Error thrown"),
// 			error: (err: HttpErrorResponse) => httpError = err
// 		});

// 		mockRequest = httpTestController.expectOne(`${organizationService.apiURL}/${organizationId}`);
// 		mockRequest.flush('Server error', {
// 			status: 403,
// 			statusText: 'Access denied'
// 		} as HttpErrorResponse);

// 		if (!httpError)
// 			throw new Error("Errors can't be handled correctly");
		
// 		expect(httpError.status).toEqual(403);
// 		expect(httpError.statusText).toEqual("Access denied");		
// 	});

// 	it('should update existing organization', () => {
// 		mockOrganization = {
// 			id: 1,
// 			name: "Organization 1",
// 		};
// 		let mockUpdatedOrg = { ...mockOrganization, name: "My first organization" };

// 		let organizationId = mockOrganization.id;

// 		mockOrganization.name = "My first organization";

// 		organizationService.updateOrganizationData(organizationId, mockOrganization).subscribe((updatedOrg) => {
// 			mockOrganization = updatedOrg;
// 		});

// 		mockRequest = httpTestController.expectOne(`${organizationService.apiURL}/${organizationId}`);
// 		expect(mockRequest.request.method).toEqual("PUT");
// 		mockRequest.flush(mockUpdatedOrg);
// 		expect(mockOrganization).toEqual(mockUpdatedOrg);
// 	});

// 	it('should be able to handle errors when trying to update existing organization', () => {
// 		mockOrganization = {
// 			id: 1,
// 			name: "Organization 1"
// 		};

// 		let organizationId = mockOrganization.id;

// 		mockOrganization.name = "My first organization";

// 		organizationService.updateOrganizationData(organizationId, mockOrganization).subscribe({
// 			next: () => fail("Error thrown"),
// 			error: (err: HttpErrorResponse) => httpError = err
// 		});

// 		mockRequest = httpTestController.expectOne(`${organizationService.apiURL}/${organizationId}`);
// 		mockRequest.flush('Server error', {
// 			status: 403,
// 			statusText: 'Access denied'
// 		} as HttpErrorResponse);

// 		if (!httpError)
// 			throw new Error("Errors can't be handled correctly when trying to update existing organization");
		
// 		expect(httpError.status).toEqual(403);
// 		expect(httpError.statusText).toEqual("Access denied");
	
// 	});

// 	it('should delete existing organization', () => {

// 	});

// 	it('should be able to handle errors when trying to delete existing organization', () => {

// 	});

// 	it('should return an organization by name', () => {

// 	});
// });
