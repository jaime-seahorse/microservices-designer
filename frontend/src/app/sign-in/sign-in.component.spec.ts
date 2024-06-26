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

let loader: HarnessLoader;
let fixture: ComponentFixture<SignInComponent>;
let usernameFormField: MatFormFieldHarness;
let emailFormField: MatFormFieldHarness;
let organizationNameFormField: MatFormFieldHarness;
let passwordFormField: MatFormFieldHarness;
let passwordConfirmFormField: MatFormFieldHarness;
let submitButton: MatButtonHarness;

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
		loader = TestbedHarnessEnvironment.loader(fixture);

		let formFields = await loader.getAllHarnesses(MatFormFieldHarness);

    usernameFormField = formFields[0];
		emailFormField = formFields[1];
		organizationNameFormField = formFields[2];
    passwordFormField = formFields[3];
    passwordConfirmFormField = formFields[4];

		submitButton = await loader.getHarness(MatButtonHarness.with({ selector: 'button[mat-raised-button]' }));
	});

	// test('should create form', async () => {
	// 	expect(await usernameFormField.getControl()).toBeTruthy();
	// 	expect(await emailFormField.getControl()).toBeTruthy();
  //   expect(await organizationFormField.getControl()).toBeTruthy();
  //   expect(await passwordFormField.getControl()).toBeTruthy();
  //   expect(await passwordConfirmFormField.getControl()).toBeTruthy();
	// 	expect(submitButton).toBeTruthy();
	// });
	
	// test('should signin a new user (The user fills good the form to sign in)', async () => {
	// 	let usernameInput = await usernameFormField.getControl(MatInputHarness) as MatInputHarness;
	// 	let emailInput = await emailFormField.getControl(MatInputHarness) as MatInputHarness;
	// 	let organizationInput = await organizationFormField.getControl(MatInputHarness) as MatInputHarness;
	// 	let passwordInput = await passwordFormField.getControl(MatInputHarness) as MatInputHarness;
	// 	let passwordConfirmInput = await passwordConfirmFormField.getControl(MatInputHarness) as MatInputHarness;
	// 	await usernameInput.setValue('pepe');
	// 	await emailInput.setValue('pepe@gmail.com');
	// 	await organizationInput.setValue('Pepe Organization');
	// 	await passwordInput.setValue('pepe1234');
	// 	await passwordConfirmInput.setValue('pepe1234');
	// 	await submitButton.click();
	// 	expect(await usernameInput.getValue()).toEqual('pepe');
	// 	expect(await emailInput.getValue()).toEqual('pepe@gmail.com');
	// 	expect(await organizationInput.getValue()).toEqual('Pepe Organization');
	// 	expect(await passwordInput.getValue()).toEqual('pepe1234');
	// 	expect(await passwordConfirmInput.getValue()).toEqual('pepe1234');
	// 	expect(await usernameFormField.hasErrors()).toBeFalsy();
	// 	expect(await emailFormField.hasErrors()).toBeFalsy();
	// 	expect(await organizationFormField.hasErrors()).toBeFalsy();
	// 	expect(await passwordFormField.hasErrors()).toBeFalsy();
	// 	expect(await passwordConfirmFormField.hasErrors()).toBeFalsy();
	// });

	test('form should show errors (The user fills bad the form to sign in)', async () => {
		let usernameInput = await usernameFormField.getControl(MatInputHarness) as MatInputHarness;
		let emailInput = await emailFormField.getControl(MatInputHarness) as MatInputHarness;
		let organizationNameInput = await organizationNameFormField.getControl(MatInputHarness) as MatInputHarness;
		let passwordInput = await passwordFormField.getControl(MatInputHarness) as MatInputHarness;
		let passwordConfirmInput = await passwordConfirmFormField.getControl(MatInputHarness) as MatInputHarness;
		await usernameInput.setValue('');
		await submitButton.click();
		expect(await usernameFormField.hasErrors()).toBeTruthy();
		await emailInput.setValue('invalid email');
		await submitButton.click();
		expect(await emailFormField.hasErrors()).toBeTruthy();
		await emailInput.setValue('');
		await submitButton.click();
		expect(await emailFormField.hasErrors()).toBeTruthy();
		await organizationNameInput.setValue('');
		await submitButton.click();
		expect(await organizationNameFormField.hasErrors()).toBeTruthy();
		await passwordInput.setValue('1234567');
		await submitButton.click();
		expect(await passwordFormField.hasErrors()).toBeTruthy();
		await passwordInput.setValue('111111111111111111111111111111111111111111111111111111111111');
		await submitButton.click();
		expect(await passwordFormField.hasErrors()).toBeTruthy();
		await passwordInput.setValue('');
		await submitButton.click();
		expect(await passwordFormField.hasErrors()).toBeTruthy();
		await passwordInput.setValue('12345678');
		await passwordConfirmInput.setValue('90123456');
		await submitButton.click();
		expect(await passwordConfirmFormField.hasErrors()).toBeTruthy();
		await passwordConfirmInput.setValue('');
		await submitButton.click();
		expect(await passwordConfirmFormField.hasErrors()).toBeTruthy();
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