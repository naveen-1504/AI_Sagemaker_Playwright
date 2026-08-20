Feature: User Management API Testing
  As an API consumer
  I want to manage user accounts via API
  So that I can perform CRUD operations

  @api
  Scenario: Complete user lifecycle - Register, Login, Get, Update
    Given I register a new user via API
    When I login with valid credentials via API
    Then I should receive an access token
    When I get user details via API
    Then I should see the user information
    When I update user details via API
    Then the user details should be updated
