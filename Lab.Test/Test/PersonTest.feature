Feature: PersonTest
	In order to avoid wrong data entry 
	As an user
	I want to add valid user information

@mytag
Scenario: Add Person to storage
	Given I have entered a valid user Name
	And I have entered a valid email address
	And I have entered a valid phone number
	And I have selected a valid province
	When I press Create User
	Then the user information should be stored

Scenario: Invalid Email Address
	Given I have entered a valid user Name
	And I have entered an invalid email address
	And I have entered a valid phone number
	And I have selected a valid province
	When I press Create User
	Then the user cannot be stored

Scenario: Invalid UserName
	Given I have entered an invalid user Name
	And I have entered a valid email address
	And I have entered a valid phone number
	And I have selected a valid province
	When I press Create User
	Then the user cannot be stored

Scenario: Invalid PhoneNumber
	Given I have entered a valid user Name
	And I have entered a valid email address
	And I have entered an invalid phone number
	And I have selected a valid province
	When I press Create User
	Then the user cannot be stored

Scenario: RetrivePersonData
	When I ask for person data
	Then the data should be retrieved

