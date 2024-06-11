// ATENCION!!!: dto's and service per component

//-> Request

export interface SignInRequest {
	username: string,
	email: string,
	organizationName: string,
	password: string
}

export interface LogInRequest {
	email: string,
	password: string
}

// export interface ForgotPasswordRequest {
// 	oldPassword: string,
// 	newPassword: string
// }

// export interface SignOutRequest {
// 	password: string
// }

//-> Response

export interface SignInResponse {
	errors?: SignInErrorResponse,
	message?: string
}

export interface LogInResponse {
	token: string,
	message: string
}

export interface LogOutResponse {
	message: string
}

// export interface ForgotPasswordResponse {}

// export interface SignOutResponse {}

export interface SignInErrorResponse {
	username?: string,
	email?: string,
	organizationName?: string,
	password?: string
}