Feature: Registration Form Test Automation  Script

  Scenario: Fill and Submit a Registration Form
    When i open the URL "https://testautomationpractice.blogspot.com/"
    When i enter "SILVEN STONE" in the "Name:" textfield
    When i click on "START" button
    When i enter "java" in the search box
    Then i click on "Search button"
    When i click on "Home" link
    When i clicked on "PlaywrightPractice" hyperlink
    When i click on "Home" link