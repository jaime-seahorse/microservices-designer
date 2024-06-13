import { SignInErrorResponse } from "./sign-in-error-response.dto"

export interface SignInResponse {
	errors?: SignInErrorResponse,
	message?: string
}