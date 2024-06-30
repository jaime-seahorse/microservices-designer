import { Given, When, Then } from '@cucumber/cucumber';

import { SignInService } from 'src/user/user-signin-use-case/signin.service';
import { SignInRequest } from 'src/user/user-signin-use-case/signin-request.dto';
import { SignInResponse } from 'src/user/user-signin-use-case/signin-response.dto';

// Mocks and setup
let signInService: SignInService;
let signInRequest: SignInRequest;
let signInResponse: SignInResponse;
let error: any;

Given('the user provides valid credentials', () => {
    signInRequest = {
        email: 'pepe@mail.com',
        name: 'Pepe',
        password: 'changeme',
        organizationName: 'PepeOrganization'
    };
});

When('the user attempts to sign in', async () => {
    try {
        signInResponse = await signInService.signIn(signInRequest);
    } catch (err) {
        error = err;
    }
});

Then('the user should be signed in successfully', () => {
    expect(signInResponse).not.toBe(undefined)
    expect(signInResponse.email).toEqual(signInRequest.email);
    expect(signInResponse.name).toEqual(signInRequest.name);
    expect(signInResponse.organizationName).toEqual(signInRequest.organizationName);
});

