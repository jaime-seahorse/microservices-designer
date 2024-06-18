import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateBoundedContextRequest } from './create-bounded-context-request.dto';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { CreateBoundedContextService } from './create-bounded-context.service';

@Component({
  selector: 'app-create-bounded-context-form',
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
  templateUrl: './create-bounded-context.component.html',
})
export class CreateBoundedContextComponent {
  form: FormGroup;
	globalMessage: string = '';

	constructor(
    private formBuilder: FormBuilder,
		private boundedContextService: CreateBoundedContextService
  ){
    this.form = this.formBuilder.group({
      boundedContextName: ['', [
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

			let boundedContextData: CreateBoundedContextRequest = {
				name: this.form.value.projectName
			};

			this.boundedContextService.createBoundedContext(boundedContextData).subscribe({
				next: (response) => {
					this.globalMessage = response.body!.message!;
				},
				error: (error) => {
					if (error.status == 404 || error.status == 409) 
						this.getControl('projectName')?.setErrors({ invalid: error.body?.message });
					else 
						this.globalMessage = error.body?.message as string;

					this.form.enable();
        },
				complete: () => {
          this.form.enable();
				}
			})
    }
  }
}
