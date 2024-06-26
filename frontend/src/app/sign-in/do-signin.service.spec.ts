import { TestBed } from '@angular/core/testing';

import { MakeSignInService } from './do-signin.service';
import { SignInRequest } from './do-signin-request.dto';
import { SignInResponse } from './do-signin-response.dto';

import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('SignInService', () => {
  let signInService: MakeSignInService;
	let httpTestController: HttpTestingController;
	let mockRequest: TestRequest;
	let httpError: HttpErrorResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
    signInService = TestBed.inject(MakeSignInService);
		httpTestController = TestBed.inject(HttpTestingController);
  });

	afterEach(() => {
		httpTestController.verify();
	});

  it('should be created', () => {
    expect(signInService).toBeTruthy();
  });

	it('should register a new user (The user fills good the form to sign in)', () => {
		let newUserData: SignInRequest = {
			username: "paul7777",
			email: "paul7777@hotmail.com",
			organizationName: "Paul's Organization",
			password: "1234"
		};
		
		let mockSignInResponse: SignInResponse = {
			message: 'User registered successfully!!'
		};

		let responseMessage: string = '';

		signInService.signInUser(newUserData).subscribe((response) => {
			responseMessage = response.body?.message as string;
		});

		mockRequest = httpTestController.expectOne(`${signInService.apiURL}/signin`);
		expect(mockRequest.request.method).toEqual("POST");
		mockRequest.flush(mockSignInResponse);
		expect(responseMessage).toEqual(mockSignInResponse.message!);
	});

	// it('should be able to handle errors when trying to register a new user', () => {
	// 	let mockUserData: SignInRequest = {
	// 		username: "paul7777",
	// 		email: "bademail",
	// 		password: "1234",
	// 		organizationName: "Paul's Organization"
	// 	};

	// 	signInService.signInUser(mockUserData).subscribe({
	// 		next: () => fail("Error thrown"),
	// 		error: (err: HttpErrorResponse) => httpError = err
	// 	});

	// 	mockRequest = httpTestController.expectOne(`${signInService.apiURL}/signin`);
	// 	mockRequest.flush('Server error', {
	// 		status: 400,
	// 		statusText: 'Bad Request'
	// 	} as HttpErrorResponse);

	// 	if(!httpError)
	// 		throw new Error("Errors can't be handled correctly");

	// 	expect(httpError.status).toEqual(400);
	// 	expect(httpError.statusText).toEqual('Bad Request');
	// });
});