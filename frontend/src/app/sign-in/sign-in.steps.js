import { defineFeature, loadFeature } from 'jest-cucumber';
const feature = loadFeature('./sign-in.feature');

defineFeature(feature, test => {
	test('The user fills good the form to sign in', ({given, when, then, and}) => {
		
	});
})