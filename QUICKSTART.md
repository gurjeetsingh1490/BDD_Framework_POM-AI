# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

This will install:
- @cucumber/cucumber - BDD framework
- @playwright/test - Browser automation
- playwright - Playwright library
- typescript - TypeScript support
- ts-node - TypeScript executor

### Step 2: Install Playwright Browsers
```bash
npx playwright install
```

### Step 3: Run the Tests
```bash
npm test
```

> The tests will execute in headless Chromium and automatically open the HTML report when finished.

### Step 4: View Test Report
The report is opened for you automatically; alternatively check:
```
test-results/cucumber-report.html
```
---

## 📋 Test Scenario Details

The test scenario included covers the following interactions:

| Field | Action | Value |
|-------|--------|-------|
| Name | Enter Text | MAYANK PRATAP |
| Email | Enter Text | mayankumar45@gmail.com |
| Phone | Enter Text | 0099955567 |
| Address | Enter Text | 21 jersey parade, Carnegie |
| Gender | Select Radio | Male |
| Days | Select Checkbox | Saturday |
| Country | Select Dropdown | India |
| Colors | Select Checkbox | Blue |
| Date Picker | Select Date | 03/07/2026 |

---

## 📁 Project Structure at a Glance

```
src/
├── features/          👈 Where Gherkin scenarios live
├── pages/             👈 Page Object Model classes
├── steps/             👈 Step implementations
├── hooks/             👈 Setup and cleanup
└── utils/             👈 Helper utilities

index.html            👈 Sample form for testing
```

---

## 🔑 Key Files Explained

### 1. **formRegistration.feature**
Contains Gherkin scenarios written in plain English

### 2. **FormPage.ts**
Page Object with all form selectors and methods:
- `enterName()`, `enterEmail()`, `enterPhone()`
- `selectGender()`, `selectDay()`, `selectCountry()`
- `selectColor()`, `selectDatepicker()`

### 3. **formSteps.ts**
Step definitions that connect Gherkin text to page object methods

### 4. **BrowserManager.ts**
Handles browser lifecycle (launch, close)

### 5. **hooks.ts**
Cucumber hooks for Before/After test execution

---

## 🎯 Common Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:chrome` | Run with Chrome |
| `npm run test:firefox` | Run with Firefox |
| `npm run test:webkit` | Run with Safari (WebKit) |
| `npm run test:report` | Generate HTML report |

---

## ✅ Verifying Everything Works

After installation, run:
```bash
npm test
```

You should see:
- ✅ Browser launching
- ✅ Form fields being filled
- ✅ Selections being made
- ✅ Test passing
- ✅ Report generated

---

## 🧹 Cleaning Up

Remove test artifacts:
```bash
rm -r dist test-results node_modules
npm install
```

---

## 🐛 Troubleshooting

### "Command not found: npm"
- Install Node.js from https://nodejs.org/

### "Browser not found"
```bash
npx playwright install
```

### "Module not found"
```bash
npm install --force
```

### "Port already in use"
- Change browser instance or close other automation processes

---

## 📝 Next Steps

1. ✅ Review the `README.md` for full documentation
2. ✅ Explore `FormPage.ts` to understand POM pattern
3. ✅ Create additional feature files in `src/features/`
4. ✅ Add new step definitions as needed
5. ✅ Customize selectors for your application

---

## 📞 Need Help?

- Check the detailed `README.md`
- Review step definitions in `src/steps/formSteps.ts`
- Inspect the HTML form in `index.html`
- Use browser DevTools to find correct selectors

---

Happy Testing! 🎉
