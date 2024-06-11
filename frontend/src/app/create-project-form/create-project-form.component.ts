import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { CreateProjectRequest, CreateProjectResponse } from '../resources/project/project.dto';
import { HttpResponse } from '@angular/common/http';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ProjectService } from '../resources/project/project.service';

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
  templateUrl: './create-project-form.component.html',
	styleUrl: './create-project-form.component.css'
})
export class CreateProjectFormComponent {
  form: FormGroup;
	globalMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
		private projectService: ProjectService
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

			// this.projectService.createProject(projectData).subscribe({
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
