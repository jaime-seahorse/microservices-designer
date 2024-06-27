import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
// import { MatErrorHarness } from '@angular/material/form-field/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { SignInComponent } from './sign-in.component';
import { MakeSignInService } from './do-signin.service';
import { screen } from '@testing-library/angular';

let loader: HarnessLoader;
let fixture: ComponentFixture<SignInComponent>;
let signInComponent: SignInComponent
let userNameFormField: MatFormFieldHarness;
let userEmailFormField: MatFormFieldHarness;
let organizationNameFormField: MatFormFieldHarness;
let userPasswordFormField: MatFormFieldHarness;
let userPasswordConfirmFormField: MatFormFieldHarness;
let signInButton: MatButtonHarness;

describe('SignInComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule(
			{
				imports: [
					SignInComponent,
					HttpClientTestingModule
				],
				providers: [
					MakeSignInService,
					provideRouter(routes),
					provideAnimationsAsync(),
				]
			})
			.compileComponents();

		fixture = TestBed.createComponent(SignInComponent);
		signInComponent = fixture.componentInstance;
		loader = TestbedHarnessEnvironment.loader(fixture);

		let formFields = await loader.getAllHarnesses(MatFormFieldHarness);

    userNameFormField = formFields[0];
		userEmailFormField = formFields[1];
		organizationNameFormField = formFields[2];
    userPasswordFormField = formFields[3];
    userPasswordConfirmFormField = formFields[4];

		signInButton = await loader.getHarness(MatButtonHarness.with({ selector: 'button[mat-raised-button]' }));
	});

	// test('should create form', async () => {
	// 	expect(await userNameFormField.getControl()).toBeTruthy();
	// 	expect(await userEmailFormField.getControl()).toBeTruthy();
  //   expect(await organizationNameFormField.getControl()).toBeTruthy();
  //   expect(await userPasswordFormField.getControl()).toBeTruthy();
  //   expect(await userPasswordConfirmFormField.getControl()).toBeTruthy();
	// 	expect(submitButton).toBeTruthy();
	// });
	
	test('should signin a new user (The user fills good the form to sign in)', async () => {
		let userNameInput = await userNameFormField.getControl(MatInputHarness) as MatInputHarness;
		let userEmailInput = await userEmailFormField.getControl(MatInputHarness) as MatInputHarness;
		let organizationNameInput = await organizationNameFormField.getControl(MatInputHarness) as MatInputHarness;
		let userPasswordInput = await userPasswordFormField.getControl(MatInputHarness) as MatInputHarness;
		let userPasswordConfirmInput = await userPasswordConfirmFormField.getControl(MatInputHarness) as MatInputHarness;
		await userNameInput.setValue('pepe');
		await userEmailInput.setValue('pepe@gmail.com');
		await organizationNameInput.setValue('Pepe Organization');
		await userPasswordInput.setValue('pepe1234');
		await userPasswordConfirmInput.setValue('pepe1234');
		expect(await userNameInput.getValue()).toEqual('pepe');
		expect(await userEmailInput.getValue()).toEqual('pepe@gmail.com');
		expect(await organizationNameInput.getValue()).toEqual('Pepe Organization');
		expect(await userPasswordInput.getValue()).toEqual('pepe1234');
		expect(await userPasswordConfirmInput.getValue()).toEqual('pepe1234');
		await signInButton.click();
		expect(await userNameFormField.hasErrors()).toBeFalsy();
		expect(await userEmailFormField.hasErrors()).toBeFalsy();
		expect(await organizationNameFormField.hasErrors()).toBeFalsy();
		expect(await userPasswordFormField.hasErrors()).toBeFalsy();
		expect(await userPasswordConfirmFormField.hasErrors()).toBeFalsy();
	});

	test('form should show errors (The user fills bad the form to sign in)', async () => {
		let userNameInput = await userNameFormField.getControl(MatInputHarness) as MatInputHarness;
		let userEmailInput = await userEmailFormField.getControl(MatInputHarness) as MatInputHarness;
		let userOrganizationNameInput = await organizationNameFormField.getControl(MatInputHarness) as MatInputHarness;
		let userPasswordInput = await userPasswordFormField.getControl(MatInputHarness) as MatInputHarness;
		let userPasswordConfirmInput = await userPasswordConfirmFormField.getControl(MatInputHarness) as MatInputHarness;
		await userNameInput.setValue('');
		await signInButton.click();
		expect(await userNameFormField.hasErrors()).toBeTruthy();
		await userEmailInput.setValue('invalid email');
		await signInButton.click();
		expect(await userEmailFormField.hasErrors()).toBeTruthy();
		await userEmailInput.setValue('');
		await signInButton.click();
		expect(await userEmailFormField.hasErrors()).toBeTruthy();
		await userOrganizationNameInput.setValue('');
		await signInButton.click();
		expect(await organizationNameFormField.hasErrors()).toBeTruthy();
		await userPasswordInput.setValue('1234567');
		await signInButton.click();
		expect(await userPasswordFormField.hasErrors()).toBeTruthy();
		await userPasswordInput.setValue('111111111111111111111111111111111111111111111111111111111111');
		await signInButton.click();
		expect(await userPasswordFormField.hasErrors()).toBeTruthy();
		await userPasswordInput.setValue('');
		await signInButton.click();
		expect(await userPasswordFormField.hasErrors()).toBeTruthy();
		await userPasswordInput.setValue('12345678');
		await userPasswordConfirmInput.setValue('90123456');
		await signInButton.click();
		expect(await userPasswordConfirmFormField.hasErrors()).toBeTruthy();
		await userPasswordConfirmInput.setValue('');
		await signInButton.click();
		expect(await userPasswordConfirmFormField.hasErrors()).toBeTruthy();
	});

	test('should show existing-user message (The user fills good the form but user or organization exist in database)', async () => {
		let userNameInput = await userNameFormField.getControl(MatInputHarness) as MatInputHarness;
		let userEmailInput = await userEmailFormField.getControl(MatInputHarness) as MatInputHarness;
		let organizationNameInput = await organizationNameFormField.getControl(MatInputHarness) as MatInputHarness;
		let userPasswordInput = await userPasswordFormField.getControl(MatInputHarness) as MatInputHarness;
		let userPasswordConfirmInput = await userPasswordConfirmFormField.getControl(MatInputHarness) as MatInputHarness;
		await userNameInput.setValue('pepe');
		await userEmailInput.setValue('pepe@gmail.com');
		await organizationNameInput.setValue('Pepe Organization');
		await userPasswordInput.setValue('pepe1234');
		await userPasswordConfirmInput.setValue('pepe1234');
		expect(await userNameInput.getValue()).toEqual('pepe');
		expect(await userEmailInput.getValue()).toEqual('pepe@gmail.com');
		expect(await organizationNameInput.getValue()).toEqual('Pepe Organization');
		expect(await userPasswordInput.getValue()).toEqual('pepe1234');
		expect(await userPasswordConfirmInput.getValue()).toEqual('pepe1234');
		await signInButton.click();
		expect(await userNameFormField.hasErrors()).toBeFalsy();
		expect(await userEmailFormField.hasErrors()).toBeFalsy();
		expect(await organizationNameFormField.hasErrors()).toBeFalsy();
		expect(await userPasswordFormField.hasErrors()).toBeFalsy();
		expect(await userPasswordConfirmFormField.hasErrors()).toBeFalsy();
		signInComponent.existingUserMessage = 'The user already exists';
		fixture.detectChanges();
		expect(screen.getByText(signInComponent.existingUserMessage)).toBeTruthy();
	});

  //-> Sync Validation

  // username

  // test('username field should display error message when empty', async () => {
	// 	await submitButton.click();
	// 	let error = (await usernameFormField.getErrors())?.[0];
	// 	expect(await error.getText()).toBe('username is required');
	// });

  // // email

	// test('email field should display error message when empty', async () => {
	// 	await submitButton.click();
	// 	let error = (await emailFormField.getErrors())?.[0];
	// 	expect(await error.getText()).toBe('email is required');
	// });

	// test('email field should display error message when invalid', async () => { 
	// 	let emailInput = await emailFormField.getControl(MatInputHarness);
  //   await emailInput?.setValue('1234');
  //   await submitButton.click();
	// 	let error = (await emailFormField.getErrors())?.[0];
	// 	expect(await error.getText()).toBe('email is invalid');
	// });

	// test('email field shouldn\'t display error message when valid', async () => {
  //   let emailInput = await emailFormField.getControl(MatInputHarness);
  //   await emailInput?.setValue('pepe@gmail.com');
  //   await submitButton.click();
	// 	let error = (await emailFormField.getErrors())?.[0];
	// 	expect(error).toBeFalsy();
  // })

  // // organizationName

  // test('organization name field should display error message when empty', async () => {
  //   await submitButton.click();
  //   let error = (await organizationFormField.getErrors())?.[0];
  //   expect(await error.getText()).toBe('organization name is required');
  // });

  // // password

	// test('password field should display error message when empty', async () => {
  //   await submitButton.click();
	// 	let error = (await passwordFormField.getErrors())?.[0];
	// 	expect(await error.getText()).toBe('password is required');
  // })

	// test('password field should display error message when value length is lower than minimum one', async () => {
  //   let passwordInput = await passwordFormField.getControl(MatInputHarness);
  //   await passwordInput?.setValue('1');
  //   await submitButton.click();
	// 	let error = (await passwordFormField.getErrors())?.[0];
	// 	expect(await error.getText()).toBe('password must be between 8 and 50 characters');
  // })

	// test('password field should display error message when value length is greater than maximum one', async () => {
  //   let passwordInput = await passwordFormField.getControl(MatInputHarness);
  //   await passwordInput?.setValue('123456789123456789123456789123456789123456789123456');
  //   await submitButton.click();
	// 	let error = (await passwordFormField.getErrors())?.[0];
	// 	expect(await error.getText()).toBe('password must be between 8 and 50 characters');
  // })

  // test('password field shouldn\'t display error message when valid', async () => {
  //   let passwordInput = await passwordFormField.getControl(MatInputHarness);
  //   await passwordInput?.setValue('12345678');
  //   await submitButton.click();
	// 	let error = (await passwordFormField.getErrors())?.[0];
	// 	expect(error).toBeFalsy();
  // })

  // // passwordConfirm

	// test('password confirmation field should display error when empty', async () => {
  //   await submitButton.click();
	// 	let error = (await passwordFormField.getErrors())?.[0];
	// 	expect(error).toBeTruthy();
  // })

  // test('password confirmation field should display error message when password is unconfirmed', async () => {
  //   let passwordInput = await passwordFormField.getControl(MatInputHarness);
  //   await passwordInput?.setValue('1234');
  //   let passwordConfirmInput = await passwordConfirmFormField.getControl(MatInputHarness);
  //   await passwordConfirmInput?.setValue('12345678');
  //   await submitButton.click();
	// 	let error = (await passwordConfirmFormField.getErrors())?.[0];
	// 	expect(await error?.getText()).toBe('both passwords must be the same');
  // })

  // test('password confirmation field shouldn\'t display error message when valid', async () => {
  //   let passwordInput = await passwordFormField.getControl(MatInputHarness);
  //   await passwordInput?.setValue('12345678');
  //   let passwordConfirmInput = await passwordConfirmFormField.getControl(MatInputHarness);
  //   await passwordConfirmInput?.setValue('12345678');
  //   await submitButton.click();
	// 	let error = (await passwordConfirmFormField.getErrors())?.[0];
	// 	expect(error).toBeFalsy();
  // })

  //-> Async validation
});