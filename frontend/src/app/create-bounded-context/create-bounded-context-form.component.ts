import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BoundedContextService } from '../bounded-context-list/bounded-context.service';
import { CreateBoundedContextRequest } from '../bounded-context-list/bounded-context.dto';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

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
  templateUrl: './create-bounded-context-form.component.html',
  styleUrl: './create-bounded-context-form.component.css'
})
export class CreateBoundedContextFormComponent {
  form: FormGroup;
	globalMessage: string = '';

	constructor(
    private formBuilder: FormBuilder,
		private boundedContextService: BoundedContextService
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
				boundedContextName: this.form.value.projectName
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
