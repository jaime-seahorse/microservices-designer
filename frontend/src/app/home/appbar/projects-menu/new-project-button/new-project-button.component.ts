import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { CreateProjectRequest } from './create-project-use-case/create-project-request.dto';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CreateProjectService } from './create-project.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterLink,
    NgClass,
		MatProgressSpinner
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  templateUrl: './create-project.component.html',
})
export class CreateProjectComponent {
  form: FormGroup;
	globalMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
		private createProjectService: CreateProjectService
  ){
    this.form = this.formBuilder.group({
      projectName: ['', [
        Validators.required, 
				Validators.maxLength(100)
      ]]
    });
  }

	getControl(controlName: string): AbstractControl | null {
    return this.form.get(controlName);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.form.disable();

			let projectData: CreateProjectRequest = {
				projectName: this.form.value.projectName
			};

			// this.createProjectService.createProject(projectData).subscribe({
			// 	next: (response: HttpResponse<CreateProjectResponse>) => {
			// 		this.globalMessage = response.body!.message!;
			// 	},
			// 	error: (error: HttpResponse<CreateProjectResponse>) => {
			// 		if (error.status == 404 || error.status == 409) 
			// 			this.getControl('projectName')?.setErrors({ invalid: error.body?.message });
			// 		else 
			// 			this.globalMessage = error.body?.message as string;

			// 		this.form.enable();
      //   },
			// 	complete: () => {
      //     this.form.enable();
			// 	}
			// })
    }
  }
}
