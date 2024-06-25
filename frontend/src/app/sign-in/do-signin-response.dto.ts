import { SignInErrorResponse } from "./do-signin-error-response.dto"

export interface SignInResponse {
	errors?: SignInErrorResponse,
	message?: string
}