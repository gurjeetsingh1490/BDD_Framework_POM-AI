Feature: Form Registration Test Automation

  Scenario: Fill and Submit a Registration Form
    When I open the URL "https://testautomationpractice.blogspot.com/"
    When I enter "MAYANK PRATAP" in the "Name:" field
    When I enter "mayankumar45@gmail.com" in the "Email:" field
    When I enter "0099955567" in the "Phone:" field
    When I enter "21 jersey parade, Carnegie" in the "Address:" field
    When I select "Male" from the "Gender:" checkbox
    When I select "Saturday" from the "Days:" checkbox
    When I select "India" from the "Country:" dropdown field
    When I select "Blue" from the "Colors:" checklist
    When I enter or select "03/07/2026" from the "Date Picker 1 (mm/dd/yyyy):" date picker field
    Then The form should be displayed
