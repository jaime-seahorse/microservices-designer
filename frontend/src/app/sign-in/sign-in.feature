Feature: Sign in

Scenario: The user fills good the form to sign in
	Given the user don't registered
  When The user fills the form with this data (organizationName, userEmail, userName, userPassword, userPasswordConfirm)
  And the form validations are correct (organizationName !== null && organizationName !== undefined && organizationName !== "" && userEmail !== null && userEmail !== undefined && userEmail !== "" && userEmail.hasEmailFormat() && userName !== null && userName !== undefined && userName !== "" && userPassword !== null && userPassword !== undefined && userPassword !== "" && userPassword.length >= 8 && userPassword.length <= 50 && userPasswordConfirm !== null && userPasswordConfirm !== undefined && userPasswordConfirm !== "" && userPasswordConfirm.equals(userPassword))
  Then the frontend sends the user and organization to the backend
  And the backend check the user doesn't exist in database
  And organization is created in the database
  And user is created in the database 
  And the backend response the created status.
  And the frontend show the login screen.

Scenario: The user fills bad the form to sign in
	Given the user don't registered
  When The user fills the form with this data (organizationName, userEmail, userName, userPassword, userPasswordConfirm)
  And the form validations are incorrect (organizationName === null || organizationName === undefined || organizationName === "" || userEmail === null || userEmail === undefined || userEmail === "" || !userEmail.hasEmailFormat() || userName === null || userName === undefined || userName === "" || userPassword === null || userPassword === undefined || userPassword === "" || userPassword.length < 8 || userPassword.length > 50 || userPasswordConfirm === null || userPasswordConfirm === undefined || userPasswordConfirm === "" || !userPasswordConfirm.equals(userPassword))
  Then the frontend shows a message for each incorrect field   

Scenario: The user fills good the form but user or organization exist in database
	Given A user registered
  When The user fills the form with this data (organizationName, userEmail, userName, userPassword, userPasswordConfirm)
  And the form validations are correct (organizationName !== null && organizationName !== undefined && organizationName !== "" && userEmail !== null && userEmail !== undefined && userEmail !== "" && userEmail.hasEmailFormat() && userName !== null && userName !== undefined && userName !== "" && userPassword !== null && userPassword !== undefined && userPassword !== "" && userPassword.length >= 8 && userPassword.length <= 50 && userPasswordConfirm !== null && userPasswordConfirm !== undefined && userPasswordConfirm !== "" && userPasswordConfirm.equals(userPassword))
  Then the frontend sends the user and organization to the backend
  And the backend check the user exist in database 
  And the backend response user exist message
  And the frontend show message.