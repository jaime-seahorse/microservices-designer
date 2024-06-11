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
import { AuthService } from '../resources/user/auth/auth.service';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { SignInComponent } from './sign-in.component';

let loader: HarnessLoader;
let fixture: ComponentFixture<SignInComponent>;
let usernameFormField: MatFormFieldHarness;
let emailFormField: MatFormFieldHarness;
let organizationFormField: MatFormFieldHarness;
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
					AuthService,
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
		organizationFormField = formFields[2];
    passwordFormField = formFields[3];
    passwordConfirmFormField = formFields[4];

		submitButton = await loader.getHarness(MatButtonHarness.with({ selector: 'button[mat-raised-button]' }));
	});

	it('should create form', async () => {
		expect(await usernameFormField.getControl()).toBeTruthy();
		expect(await emailFormField.getControl()).toBeTruthy();
    expect(await organizationFormField.getControl()).toBeTruthy();
    expect(await passwordFormField.getControl()).toBeTruthy();
    expect(await passwordConfirmFormField.getControl()).toBeTruthy();
		expect(submitButton).toBeTruthy();
	});

  //-> Sync Validation

  // username

  it('username field should display error message when empty', async () => {
		await submitButton.click();
		let error = (await usernameFormField.getErrors())?.[0];
		expect(await error.getText()).toBe('username is required');
	});

  // email

	it('email field should display error message when empty', async () => {
		await submitButton.click();
		let error = (await emailFormField.getErrors())?.[0];
		expect(await error.getText()).toBe('email is required');
	});

	it('email field should display error message when invalid', async () => { 
		let emailInput = await emailFormField.getControl(MatInputHarness);
    await emailInput?.setValue('1234');
    await submitButton.click();
		let error = (await emailFormField.getErrors())?.[0];
		expect(await error.getText()).toBe('email is invalid');
	});

	it('email field shouldn\'t display error message when valid', async () => {
    let emailInput = await emailFormField.getControl(MatInputHarness);
    await emailInput?.setValue('pepe@gmail.com');
    await submitButton.click();
		let error = (await emailFormField.getErrors())?.[0];
		expect(error).toBeFalsy();
  })

  // organizationName

  it('organization name field should display error message when empty', async () => {
    await submitButton.click();
    let error = (await organizationFormField.getErrors())?.[0];
    expect(await error.getText()).toBe('organization name is required');
  });

  // password

	it('password field should display error message when empty', async () => {
    await submitButton.click();
		let error = (await passwordFormField.getErrors())?.[0];
		expect(await error.getText()).toBe('password is required');
  })

	it('password field should display error message when value length is lower than minimum one', async () => {
    let passwordInput = await passwordFormField.getControl(MatInputHarness);
    await passwordInput?.setValue('1');
    await submitButton.click();
		let error = (await passwordFormField.getErrors())?.[0];
		expect(await error.getText()).toBe('password must be between 8 and 50 characters');
  })

	it('password field should display error message when value length is greater than maximum one', async () => {
    let passwordInput = await passwordFormField.getControl(MatInputHarness);
    await passwordInput?.setValue('123456789123456789123456789123456789123456789123456');
    await submitButton.click();
		let error = (await passwordFormField.getErrors())?.[0];
		expect(await error.getText()).toBe('password must be between 8 and 50 characters');
  })

  it('password field shouldn\'t display error message when valid', async () => {
    let passwordInput = await passwordFormField.getControl(MatInputHarness);
    await passwordInput?.setValue('12345678');
    await submitButton.click();
		let error = (await passwordFormField.getErrors())?.[0];
		expect(error).toBeFalsy();
  })

  // passwordConfirm

	it('password confirmation field should display error when empty', async () => {
    await submitButton.click();
		let error = (await passwordFormField.getErrors())?.[0];
		expect(error).toBeTruthy();
  })

  // it('password confirmation field should display error message when password is unconfirmed', async () => {
  //   let passwordInput = await passwordFormField.getControl(MatInputHarness);
  //   await passwordInput?.setValue('1234');
  //   let passwordConfirmInput = await passwordConfirmFormField.getControl(MatInputHarness);
  //   await passwordConfirmInput?.setValue('12345678');
  //   await submitButton.click();
	// 	let error = (await passwordConfirmFormField.getErrors())?.[0];
	// 	expect(await error?.getText()).toBe('both passwords must be the same');
  // })

  // it('password confirmation field shouldn\'t display error message when valid', async () => {
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