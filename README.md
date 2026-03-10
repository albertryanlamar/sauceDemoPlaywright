# Saucedemo Playwright Automation Project

## Overview
This project is a test data-driven automated testing framework for the [Saucedemo](https://www.saucedemo.com/) web application, built using [Playwright](https://playwright.dev/) with TypeScript. It is designed to support end-to-end (E2E), providing robust reporting, easy configuration, and integration with Git CI/CD pipelines.

## Features
- **End-to-End Testing**: Automated browser tests for user flows.
- **Page Object Model**: Organized code for maintainability.
- **Reporting**: Generates Allure, HTML, and JUnit reports.
- **Docker Support**: Run tests in isolated containers.

## Project Structure
```
├── src/                # Source code (components, pages, helpers, utils, config, testdata)
├── tests/              # Test cases (e2e, api)
├── playwright.config.ts# Playwright configuration
├── reportPortal.config.ts # Report Portal config
├── Dockerfile          # Docker setup
├── report/             # Test reports (allure, html, junit)
├── playwright-report/  # Playwright HTML reports
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Docker (optional, for containerized runs)

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd saucedemoPlaywright
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running Tests
- **E2E Tests:**
  ```sh
  npx playwright test
  ```
- **API Tests:**
  ```sh
  npx playwright test tests/api
  ```
- **With Docker:**
  ```sh
  docker build -t saucedemo-playwright .
  docker run saucedemo-playwright
  ```

### Generating Reports
- **Allure Report:**
  ```sh
  npx allure serve report/allure-results
  ```
- **Playwright HTML Report:**
  ```sh
  npx playwright show-report
  ```

## Configuration
- **playwright.config.ts**: Main Playwright settings.
- **reportPortal.config.ts**: Report Portal integration.
- **src/config/**: Environment and test data configs.

## Folder Details
- **src/pages/**: Page Object Model classes for UI automation.
- **src/components/**: Reusable UI components.
- **src/helpers/**: Utility functions and helpers.
- **src/testdata/**: Test data files.
- **src/utils/**: General utilities.
- **tests/e2e/**: End-to-end test scripts.
- **tests/api/**: API test scripts.

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to the branch and open a Pull Request

## License
This project is licensed under the MIT License.

---

*For questions or support, please contact the project maintainer.*
