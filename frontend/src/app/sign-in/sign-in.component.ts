import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../resources/user/auth/auth.service';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator } from './sign-in-confirm-password-validator';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SignInRequest } from '../resources/user/auth/auth.dto';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  templateUrl: './sign-in.component.html'
})
export class SignInComponent {
  protected form: FormGroup;
  // protected minlength: number = 8;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
		private router: Router
  ){
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [
          Validators.required,
          Validators.email
        ]
      ],
      organizationName: ['', Validators.required],
      password: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50)
        ]
      ],
      passwordConfirm: ['', Validators.required],
    }, {validators: confirmPasswordValidator, updateOn: 'submit'});
  }

  onSubmit(): void {
    if (this.form.valid) {
			const newUserData: SignInRequest = {
				username: this.form.get('username')?.value,
				email: this.form.get('email')?.value,
				organizationName: this.form.get('organizationName')?.value,
				password: this.form.get('password')?.value,
			}
			
			this.authService.signInUser(newUserData).subscribe((response) => {
				console.log(response.body?.message);
				this.router.navigateByUrl('login');
			})
    }
  }
}
