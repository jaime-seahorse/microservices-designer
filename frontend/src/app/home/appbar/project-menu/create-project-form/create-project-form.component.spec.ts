import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
// import { MatErrorHarness } from '@angular/material/form-field/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

import { provideRouter } from '@angular/router';
import { routes } from '../../../../app.routes';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { CreateProjectFormComponent } from './create-project-form.component';

import { MatProgressSpinnerHarness } from '@angular/material/progress-spinner/testing';

let loader: HarnessLoader;
let fixture: ComponentFixture<CreateProjectFormComponent>;
let nameFormField: MatFormFieldHarness;
let submitButton: MatButtonHarness;

describe('CreateProjectFormComponent', () => {
  	beforeEach(async () => {
		await TestBed.configureTestingModule(
			{
				imports: [
					CreateProjectFormComponent,
					HttpClientTestingModule
				],
				providers: [
					provideRouter(routes),
					provideAnimationsAsync(),
				]
			})
			.compileComponents();

		fixture = TestBed.createComponent(CreateProjectFormComponent);
		loader = TestbedHarnessEnvironment.loader(fixture);

		nameFormField = await loader.getHarness(MatFormFieldHarness);
		submitButton = await loader.getHarness(MatButtonHarness);
	});

	it('name field should display error message when empty', async () => {
		await submitButton.click();
		let error = (await nameFormField.getErrors())?.[0];
		expect(await error.getText()).toBe('project name is required');
	});

	it('name field should display error message when length is greater than 100 characters', async () => {
		let nameInput = await nameFormField.getControl(MatInputHarness);
		await nameInput?.setValue("11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111");
		submitButton.click();
		let error = (await nameFormField.getErrors())?.[0];
		expect(await error.getText()).toBe('project name must not be greater than 100 characters');
	});

	it('name shouldn\'t display error message when valid', async () => {
    let nameInput = await nameFormField.getControl(MatInputHarness);
    await nameInput?.setValue('Project 1');
		submitButton.click();
		let error = (await nameFormField.getErrors())?.[0];
		expect(error).toBeFalsy();
	});

	it('form should be disabled when it is in pending state', async () => {
    let nameInput = await nameFormField.getControl(MatInputHarness);
		await nameInput?.setValue('Project 1');
		await submitButton.click();
		expect(fixture.componentInstance.form.disabled).toBeTruthy();
	})
	it('should show spinner when form is in pending state', async () => {
		let nameInput = await nameFormField.getControl(MatInputHarness);
		await nameInput?.setValue('Project 1');
		await submitButton.click();
		let spinner: MatProgressSpinnerHarness = await loader.getHarness(MatProgressSpinnerHarness);
		expect(spinner).toBeTruthy();
	})
});
