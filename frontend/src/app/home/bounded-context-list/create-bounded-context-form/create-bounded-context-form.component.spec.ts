import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBoundedContextFormComponent } from './create-bounded-context-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatProgressSpinnerHarness } from '@angular/material/progress-spinner/testing';

let loader: HarnessLoader;
let fixture: ComponentFixture<CreateBoundedContextFormComponent>;
let nameFormField: MatFormFieldHarness;
let submitButton: MatButtonHarness;

describe('CreateBoundedContextFormComponent', () => {

	beforeEach(async () => {
		await TestBed.configureTestingModule(
			{
				imports: [
					CreateBoundedContextFormComponent,
					HttpClientTestingModule
				],
				providers: [
					provideRouter(routes),
					provideAnimationsAsync(),
				]
			})
			.compileComponents();

		fixture = TestBed.createComponent(CreateBoundedContextFormComponent);
		loader = TestbedHarnessEnvironment.loader(fixture);

		nameFormField = await loader.getHarness(MatFormFieldHarness);
		submitButton = await loader.getHarness(MatButtonHarness);
	});

	it('name field should display error message when empty', async () => {
		await submitButton.click();
		let error = (await nameFormField.getErrors())?.[0];
		expect(await error.getText()).toBe('bounded context name is required');
	});

	it('name field should display error message when length is greater than 100 characters', async () => {
		let nameInput = await nameFormField.getControl(MatInputHarness);
		await nameInput?.setValue("11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111");
		submitButton.click();
		let error = (await nameFormField.getErrors())?.[0];
		expect(await error.getText()).toBe('bounded context name must not be greater than 100 characters');
	});

	it('name shouldn\'t display error message when valid', async () => {
		let nameInput = await nameFormField.getControl(MatInputHarness);
		await nameInput?.setValue('Bounded context 1');
		submitButton.click();
		let error = (await nameFormField.getErrors())?.[0];
		expect(error).toBeFalsy();
	});

	it('form should be disabled when it is in pending state', async () => {
		let nameInput = await nameFormField.getControl(MatInputHarness);
		await nameInput?.setValue('Bounded context 1');
		await submitButton.click();
		expect(fixture.componentInstance.form.disabled).toBeTruthy();
	})

	it('should show spinner when form is in pending state', async () => {
		let nameInput = await nameFormField.getControl(MatInputHarness);
		await nameInput?.setValue('Bounded context 1');
		await submitButton.click();
		let spinner: MatProgressSpinnerHarness = await loader.getHarness(MatProgressSpinnerHarness);
		expect(spinner).toBeTruthy();
	})
});
