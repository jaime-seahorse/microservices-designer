// import { TestBed } from '@angular/core/testing';

// import { LogInService } from './log-in.service';
// import { LogInRequest } from './log-in-request.dto';
// import { User } from '../resources/user/user';

// describe('LogInService', () => {
//   let logInService: LogInService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     logInService = TestBed.inject(LogInService);
//   });

//   it('should be created', () => {
//     expect(logInService).toBeTruthy();
//   });

// 	it('should log in an existing user with email', () => {
// 		let mockUserData: LogInRequest = {
// 			email: "paul7777@hotmail.com",
// 			password: "1234"
// 		};

// 		let mockLoggedUser: User = {
// 			username: "paul7777",
// 			email: "paul7777@hotmail.com",
// 		};

// 		logInService.logInUser(mockUserData).subscribe((response) => {
// 			mockUser = response.user;
// 		});

// 		mockRequest = httpTestController.expectOne(`${logInService.apiURL}/login`);
// 		expect(mockRequest.request.method).toEqual("POST");
// 		mockRequest.flush({
// 			user: mockLoggedUser,
// 			message: "Logged correctly"
// 		});
// 		expect(mockUser).toEqual(mockLoggedUser);
// 	});

// 	it('should be able to handle errors when trying to log in an existing user', () => {
// 		let mockUserData: LogInData = {
// 			email: "bademail",
// 			password: "1234"
// 		};

// 		logInService.logInUser(mockUserData).subscribe({
// 			next: () => fail("Error thrown"),
// 			error: (err: HttpErrorResponse) => httpError = err
// 		});

// 		mockRequest = httpTestController.expectOne(`${logInService.apiURL}/login`);
// 		mockRequest.flush('Server error', {
// 			status: 400,
// 			statusText: 'Bad Request'
// 		} as HttpErrorResponse);

// 		if(!httpError)
// 			throw new Error("Errors can't be handled correctly");

// 		expect(httpError.status).toEqual(400);
// 		expect(httpError.statusText).toEqual('Bad Request');
// 	});
// });
