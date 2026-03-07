# BDD POM Automation Framework

A simple and easy Cucumber BDD automation testing framework built with Playwright and TypeScript using the Page Object Model (POM) pattern.

## Project Structure

```
BBD_POM_Automation/
├── src/
│   ├── features/           # Gherkin feature files
│   │   └── formRegistration.feature
│   ├── pages/              # Page Object Model classes
│   │   ├── BasePage.ts
│   │   └── FormPage.ts
│   ├── steps/              # Step definitions
│   │   └── formSteps.ts
│   ├── hooks/              # Cucumber hooks (Before/After)
│   │   └── hooks.ts
│   └── utils/              # Utility classes
│       └── BrowserManager.ts
├── test-results/           # Test reports and screenshots
├── index.html              # Sample HTML form for testing
├── package.json
├── tsconfig.json
├── cucumber.js             # Cucumber configuration
└── README.md               # This file
```

## Features

- ✅ Cucumber BDD Framework
- ✅ Playwright for browser automation
- ✅ TypeScript for type safety
- ✅ Page Object Model (POM) pattern
- ✅ Easy-to-read Gherkin scenarios
- ✅ Multiple browser support (Chrome, Firefox, WebKit)
- ✅ Screenshot on test failure
- ✅ HTML test reports

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Navigate to the project directory:
```bash
cd D:\PlayWright_Typescript_Automation\BBD_POM_Automation
```

2. Install dependencies:
```bash
npm install
```

## Running Tests

### Run all tests:
```bash
npm test
```

### Run with specific browser:
```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

### Generate HTML report:
```bash
npm run test:report
```

## Test Scenarios

The framework includes a comprehensive registration form test scenario that covers:

- ✅ Text input fields (Name, Email, Phone, Address)
- ✅ Radio buttons (Gender - Male/Female)
- ✅ Checkboxes (Days - Saturday, Sunday)
- ✅ Dropdown selection (Country)
- ✅ Multiple checkboxes (Colors)
- ✅ Date picker input

### Example Feature:
```gherkin
Feature: Form Registration Test Automation

  Scenario: Fill and Submit a Registration Form
    When I open the URL "D:\PlayWright_Typescript_Automation\BBD_POM_Automation"
    When I enter "MAYANK PRATAP" in the "Name:" field
    When I enter "mayankumar45@gmail.com" in the "Email:" field
    When I enter "0099955567" in the "Phone:" field
    When I enter "21 jersey parade, Carnegie" in the "Address:" field
    When I select "Male" from the "Gender:" checkbox
    When I select "Saturday" from the "Days:" checkbox
    When I select "India" from the "Country:" dropdown field
    When I select "Blue" from the "Colors:" checklist
    When I enter or select "03/07/2026" from the "Date Picker 1 (mm/dd/yyyy):" date picker field
```

## Page Object Model Structure

### BasePage.ts
Base class containing common methods:
- `navigationTo(url)` - Navigate to URL
- `fillText(selector, text)` - Fill text fields
- `click(selector)` - Click elements
- `selectOption(selector, value)` - Select dropdown options
- `checkCheckbox(selector)` - Check checkboxes
- And more...

### FormPage.ts
Extends BasePage with form-specific methods:
- `enterName(name)` - Fill name field
- `enterEmail(email)` - Fill email field
- `enterPhone(phone)` - Fill phone field
- `enterAddress(address)` - Fill address field
- `selectGender(gender)` - Select gender
- `selectDay(day)` - Select days
- `selectCountry(country)` - Select country from dropdown
- `selectColor(color)` - Select colors
- `selectDatepicker(date)` - Select date

## Step Definitions

The framework supports these step definitions:

```gherkin
Given I open the URL "<url>"
When I enter "<value>" in the "<field>" field
When I select "<value>" from the "<field>" checkbox
When I select "<value>" from the "<field>" dropdown field
When I select "<value>" from the "<field>" checklist
When I enter or select "<date>" from the "<field>" date picker field
Then The form should be displayed
Then I should see a success message
```

## Browser Configuration

Modify `BrowserManager.ts` to change browser settings:
- Headless mode
- Viewport size
- Browser type (chromium, firefox, webkit)
- Launch arguments

## Generating Reports

Test reports are automatically generated in HTML format:
```
test-results/cucumber-report.html
```

## HTML Form for Testing

A sample HTML form (`index.html`) is included in the project root. To use it:

1. Open the form in a browser: `file:///<path-to-project>/index.html`
2. Update the first step in your scenario to point to the correct file path
3. Run the tests

## Extending the Framework

### Adding a New Feature:
1. Create a `.feature` file in `src/features/`
2. Add step definitions in `src/steps/`
3. Create POM classes in `src/pages/` if needed
4. Run `npm test`

### Adding New Page Object Methods:
```typescript
async yourNewMethod(parameter: string): Promise<void> {
    await this.page.fill('selector', parameter);
    // Your implementation
}
```

## Troubleshooting

### Tests not running:
1. Ensure Node.js and npm are installed
2. Run `npm install` to install dependencies
3. Check that all files are in the correct paths

### Browser not launching:
1. Ensure Playwright browsers are installed: `npx playwright install`
2. Check browser type in `BrowserManager.ts`

### Selector not found:
1. Inspect the HTML form to verify selector names
2. Update selectors in `FormPage.ts` if needed
3. Use browser DevTools to find correct selectors

## Notes

- The framework uses relative file paths for form testing
- Ensure JavaScript is enabled when testing the HTML form
- The framework supports parallel execution (adjust in `cucumber.js`)

## License

ISC

## Author

Automation Team

---

Happy Testing! 🚀
