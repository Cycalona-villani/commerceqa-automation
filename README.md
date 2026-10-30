# CommerceQA Automation

### E-Commerce Testing | Playwright | TypeScript | QA Engineering

CommerceQA Automation is a portfolio project focused on designing, developing, and maintaining a scalable automated testing framework for e-commerce shopping cart and checkout workflows.

The project demonstrates modern quality engineering practices, including UI automation, API testing, regression testing, defect management, and continuous integration.

## Project Objectives

- Build a maintainable automation framework using Playwright and TypeScript.
- Validate shopping cart, checkout, and simulated payment functionality.
- Implement reusable Page Object Models and test fixtures.
- Develop positive, negative, and end-to-end test scenarios.
- Integrate automated testing into GitHub Actions.
- Demonstrate test migration strategies and AI-assisted QA practices.

## Technology Stack

| Technology | Purpose |
|---|---|
| Playwright | Browser and API test automation |
| TypeScript | Type-safe test development |
| React + Vite | E-commerce demo application |
| Node.js | Development environment |
| GitHub Actions | Continuous integration |
| Playwright HTML Reporter | Test execution reporting |
| Git & GitHub | Version control |

## Planned Test Coverage

### Shopping Cart
- Add products to cart.
- Update product quantities.
- Remove products.
- Validate subtotal calculations.
- Verify inventory restrictions.

### Checkout
- Complete guest checkout.
- Validate required fields.
- Reject invalid shipping information.
- Verify order summaries.
- Confirm successful order submission.

### Payment Testing
- Simulate successful payments.
- Simulate declined transactions.
- Verify payment failure messages.
- Prevent duplicate order submissions.

*All payment testing uses simulated transactions. No actual financial information or live payment processing is required.*

### API Testing
- Validate product API responses.
- Verify cart data.
- Test successful order creation.
- Validate error responses.
- Test invalid request payloads.

## Automation Framework Architecture

The planned framework uses the Page Object Model (POM) design pattern to separate application interactions from test assertions.

This approach promotes reusable components, readability, and maintainability.

Key framework components include:

- Page objects for common shopping workflows.
- Reusable fixtures and setup.
- Test data management.
- Browser configuration.
- Automated assertions.
- Failure screenshots and traces.
- HTML test reports.

## Cross-Browser Testing

Playwright will support automated testing across:

- Chromium
- Firefox
- WebKit

## Continuous Integration

GitHub Actions will execute automated tests on pull requests and code changes.

The planned pipeline includes:

1. Install dependencies.
2. Install Playwright browsers.
3. Build and launch the test application.
4. Execute automated tests.
5. Generate test reports.
6. Upload reports and failure artifacts.

## Test Migration Strategy

The project will include a simulated legacy-to-Playwright migration exercise demonstrating how existing manual or legacy automation test cases can be translated into maintainable Playwright scripts.

Migration documentation will cover test mapping, reusable components, execution validation, and regression coverage.

## AI-Assisted Quality Engineering

The project will also document responsible use of AI tools to support:

- Test scenario generation.
- Boundary-value analysis.
- Test data creation.
- Automation code reviews.
- Failure investigation.
- Test maintenance.

AI-generated recommendations and code will be reviewed and validated before adoption.

## QA Documentation

The repository will include:

- Test plans and strategies.
- Test cases with expected results.
- Defect reports with reproduction steps.
- Requirements-to-test traceability.
- Automation coverage documentation.
- Test execution summaries.

## Getting Started

Installation and execution instructions will be added as the application and automation framework are implemented.

## Project Status

**In Development**

The initial milestone is to create the e-commerce demo application and implement Playwright automation for shopping cart functionality.

## Author

**Cycalona Villani**

Full Stack Developer | QA & Test Automation

[View Portfolio](https://cycalona-villani.github.io/cycalona-portfolio/)
