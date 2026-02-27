@amazon @search
Feature: Amazon search
  As a user
  I want to search for an iPhone on Amazon
  So that I can validate product details

  @happy-path
  Scenario: Search for iPhone 17 Pro Max
    Given I am on the Amazon homepage
    When I search for "iPhone 17 Pro Max"
    And I open the first result
    Then the product title should contain "iPhone 17 Pro Max"
    And the product should list storage and color features
    And the product should have a price
