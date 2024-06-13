import { TestBed } from '@angular/core/testing';

import { User, Roles } from '../user';
import {
	SignInRequest,
	LogInRequest,
	// ForgotPasswordRequest,
	// SignOutRequest,
	SignInResponse,
	LogInResponse,
	LogOutResponse,
	// ForgotPasswordResponse,
	// SignOutResponse 
} from './auth.dto';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { HttpErrorResponse } from '@angular/common/http';

describe('AuthService', () => {
  let authService: AuthService;
	let httpTestController: HttpTestingController;
	let httpError: HttpErrorResponse;
	let mockRequest: TestRequest;
	let mockUser: User;

  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
    authService = TestBed.inject(AuthService);
		httpTestController = TestBed.inject(HttpTestingController);
  });

	afterEach(() => {
		httpTestController.verify();
	});

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

	it('should log in an existing user with email', () => {
		let mockUserData: LogInData = {
			email: "paul7777@hotmail.com",
			password: "1234"
		};

		let mockLoggedUser: User = {
			username: "paul7777",
			email: "paul7777@hotmail.com",
			role: Roles.Reader
		};

		authService.logInUser(mockUserData).subscribe((response) => {
			mockUser = response.user;
		});

		mockRequest = httpTestController.expectOne(`${authService.apiURL}/login`);
		expect(mockRequest.request.method).toEqual("POST");
		mockRequest.flush({
			user: mockLoggedUser,
			message: "Logged correctly"
		});
		expect(mockUser).toEqual(mockLoggedUser);
	});

	
	
	it('should reset a user password', () => {
		let mockUserData: ForgotPasswordData = {
			oldPassword: "1234",
			newPassword: "5678"
		};

		let mockUpdatedUser: User = {
			username: "paul7777",
			email: "paul7777@hotmail.com",
			role: Roles.Reader
		};

		authService.resetPassword(mockUserData).subscribe((response) => {
			mockUser = response.user;
		});

		mockRequest = httpTestController.expectOne(`${authService.apiURL}/forgotpassword`);
		expect(mockRequest.request.method).toEqual("PUT");
		mockRequest.flush({
			user: mockUpdatedUser,
			message: "Password changed correctly"
		});
		expect(mockUser).toEqual(mockUpdatedUser);
	});

	// it('should log out currently logged user', () => {
	// 	let mockUserData: Token = {
	// 		// token: "BTOKEN"
	// 	};

	// 	let mockLoggedOutUser: User = {
	// 		username: "paul7777",
	// 		email: "paul7777@hotmail.com",
	// 		// token: "BTOKEN",
	// 		role: Roles.Reader
	// 	};

	// 	authService.logOutUser(mockUserData).subscribe((response) => {
	// 		mockUser = response.user;
	// 	}); 

	// 	mockRequest = httpTestController.expectOne(`${authService.apiURL}/logout`);
	// 	expect(mockRequest.request.method).toEqual("POST");
	// 	mockRequest.flush({
	// 		user: mockLoggedOutUser,
	// 		success: true,
	// 		message: "Logged out correctly"
	// 	});
	// 	expect(mockUser).toEqual(mockLoggedOutUser);		
	// });

	it('should sign out currently logged user', () => {
		let mockUserData: SignOutData = {
			password: "1234"
		};

		let mockSignedOutUser: User = {
			username: "paul7777",
			email: "paul7777@hotmail.com",
			role: Roles.Reader
		};

		authService.signOutUser(mockUserData).subscribe((response) => {
			mockUser = response.user;
		})
		
		mockRequest = httpTestController.expectOne(`${authService.apiURL}/signout`);
		expect(mockRequest.request.method).toEqual("POST");
		mockRequest.flush({
			user: mockSignedOutUser,
			message: "Account successfully deleted"
		});
		expect(mockUser).toEqual(mockSignedOutUser);	
	});

	it('should be able to handle errors when trying to log in an existing user', () => {
		let mockUserData: LogInData = {
			email: "bademail",
			password: "1234"
		};

		authService.logInUser(mockUserData).subscribe({
			next: () => fail("Error thrown"),
			error: (err: HttpErrorResponse) => httpError = err
		});

		mockRequest = httpTestController.expectOne(`${authService.apiURL}/login`);
		mockRequest.flush('Server error', {
			status: 400,
			statusText: 'Bad Request'
		} as HttpErrorResponse);

		if(!httpError)
			throw new Error("Errors can't be handled correctly");

		expect(httpError.status).toEqual(400);
		expect(httpError.statusText).toEqual('Bad Request');
	});

	it('should be able to handle errors when trying to reset a user password', () => {
		let mockUserData: ForgotPasswordData = {
			// token: "BTOKEN",
			oldPassword: "1234",
			newPassword: ""
		};
		authService.resetPassword(mockUserData).subscribe({
			next: () => fail("Error thrown"),
			error: (err: HttpErrorResponse) => httpError = err
		});

		mockRequest = httpTestController.expectOne(`${authService.apiURL}/forgotpassword`);
		mockRequest.flush('Server error', {
			status: 400,
			statusText: 'Bad Request'
		} as HttpErrorResponse);

		if(!httpError)
			throw new Error("Errors can't be handled correctly");

		expect(httpError.status).toEqual(400);
		expect(httpError.statusText).toEqual('Bad Request');
	});

	it('should be able to handle errors when trying to log out currently logged user', () => {
		// let mockUserData: Token = {
		// 	token: "BTOKEN"
		// };

		authService.logOutUser().subscribe({
			next: () => fail("Error thrown"),
			error: (err: HttpErrorResponse) => httpError = err
		});

		mockRequest = httpTestController.expectOne(`${authService.apiURL}/logout`);
		mockRequest.flush('Server error', {
			status: 400,
			statusText: 'Bad Request'
		} as HttpErrorResponse);

		if(!httpError)
			throw new Error("Errors can't be handled correctly");

		expect(httpError.status).toEqual(400);
		expect(httpError.statusText).toEqual('Bad Request');
	});

	it('should be able to handle errors when trying to sign out currently logged user', () => {
		let mockUserData: SignOutData = {
			token: "BTOKEN",
			password: "1234"
		};		

		authService.signOutUser(mockUserData).subscribe({
			next: () => fail("Error thrown"),
			error: (err: HttpErrorResponse) => httpError = err
		});

		mockRequest = httpTestController.expectOne(`${authService.apiURL}/signout`);
		mockRequest.flush('Server error', {
			status: 400,
			statusText: 'Bad Request'
		} as HttpErrorResponse);

		if(!httpError)
			throw new Error("Errors can't be handled correctly");

		expect(httpError.status).toEqual(400);
		expect(httpError.statusText).toEqual('Bad Request');
	});
});
