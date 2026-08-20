Feature: E-commerce Checkout Flow
  As a customer
  I want to purchase products
  So that I can complete my order

  Scenario: Complete purchase flow - Register, Login, Add Product, Checkout
    Given I navigate to registration page
    When I register a new account
    And I sign in with registered credentials
    And I navigate to home page
    And I select a product and add to cart
    And I open cart and proceed to checkout
    Then I should see logged in message
    When I proceed to billing address
    And I enter billing address details
    And I select bank transfer payment
    And I enter bank details and confirm
    Then I should see invoice generated
