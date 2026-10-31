# CommerceQA Automation

[![CommerceQA Playwright Tests](https://github.com/Cycalona-villani/commerceqa-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/Cycalona-villani/commerceqa-automation/actions/workflows/playwright.yml)

**E-Commerce Quality Engineering | Playwright | TypeScript | React | REST API Testing | CI/CD**

CommerceQA Automation is a quality engineering portfolio project focused on developing and maintaining reliable automated testing for e-commerce shopping cart, checkout, payment simulation, and REST API workflows.

The project combines a React and TypeScript storefront with a separate Express demo API and a Playwright automation framework to demonstrate functional testing, negative testing, cross-browser validation, reusable test architecture, and continuous integration. The storefront checkout currently simulates transactions locally; it is not yet integrated with the Express order endpoint.

## Project Highlights

- **19 automated test scenarios**
- **33 of 33 test executions passed locally and in GitHub Actions**
- Cross-browser UI testing with Chromium, Firefox, and WebKit
- Reusable Page Object Model (POM)
- REST AP◊ testing with Playwright
- Simulated payment approval and rejection
- Duplicate-order protection using idempotency keys
- Automated regression testing with GitHub Actions
- HTML test reports and CI artifacts

**Latest confirmed local regression execution:** 33 of 33 passed across 19 unique scenarios and four Playwright projects.

The framework runs seven UI scenarios across Chromium, Firefox, and WebKit (21 executions), and 12 REST API scenarios once in a dedicated API project.

## Technology Stack

| Technology | Purpose |
|---|---|
| Playwright | UI and REST API automation |
| TypeScript | Type-safe test development |
| React | E-commerce storefront |
| Vite | Frontend development and build tooling |
| Node.js | JavaScript runtime |
| Express | REST API backend |
| GitHub Actions | Continuous integration |
| Git & GitHub | Version control |
| Playwright HTML Reporter | Test reporting and debugging |

## Application Features

### Shopping Cart

- Product catalog
- Add products to cart
- Multiple-product cart
- Update quantities
- Remove products
- Dynamic cart totals

### Checkout

- Customer information form
- Required-field validation
- Guest checkout simulation
- Approved payment simulation
- Declined payment simulation
- Order confirmation

### REST API

- Health endpoint
- Product retrieval
- Simulated order creation response
- Customer and cart validation
- Product and quantity validation
- Simulated payment processing
- Idempotency-key handling for duplicate submissions

## Automated Test Coverage

### Shopping Cart Tests

| Test ID | Scenario |
|---|---|
| CART-001 | Add product to cart |
| CART-002 | Add multiple products |
| CART-003 | Update product quantity |
| CART-004 | Remove product from cart |

### Checkout Tests

| Test ID | Scenario |
|---|---|
| CHECK-001 | Successful checkout |
| CHECK-002 | Declined payment |
| CHECK-003 | Required-field validation |

### Product API Tests

| Test ID | Scenario |
|---|---|
| API-001 | Health endpoint returns HTTP 200 |
| API-002 | Retrieve product catalog |
| API-003 | Validate product data structure |
| API-004 | Unknown endpoint returns HTTP 404 |

### Order API Tests

| Test ID | Scenario |
|---|---|
| ORDER-001 | Create a valid order |
| ORDER-002 | Reject missing customer information |
| ORDER-003 | Reject an empty shopping cart |
| ORDER-004 | Reject invalid product quantity |
| ORDER-005 | Reject nonexistent product |
| ORDER-006 | Reject simulated declined payment |
| ORDER-007 | Return the original order for a duplicate request |
| ORDER-008 | Reject idempotency-key reuse with different order data |

## Automation Framework Architecture

CommerceQA uses the **Page Object Model (POM)** to separate application interactions from test scenarios.

### CartPage

Reusable methods for:

- Navigating to the storefront
- Adding products to the cart
- Updating product quantities
- Removing products
- Validating cart counts and totals

### CheckoutPage

Reusable methods for:

- Entering customer information
- Selecting simulated payment outcomes
- Submitting orders
- Validating successful checkout
- Validating declined payments

This architecture reduces duplicated browser interactions and helps make automated tests easier to maintain.

## Project Structure

```text
commerceqa-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── pages/
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── public/
│   └── assets/
│       └── commerceqa.svg
├── server/
│   ├── index.ts
│   └── products.json
├── src/
│   ├── components/
│   │   └── Checkout.tsx
│   ├── App.tsx
│   ├── App.css
│   └── index.css
├── tests/
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── products-api.spec.ts
│   └── orders-api.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 24 or a compatible supported version
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/Cycalona-villani/commerceqa-automation.git
cd commerceqa-automation
```

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

### Start the Storefront

```bash
npm run dev
```

Open:

http://localhost:5173/

### Start the REST API

```bash
npm run api
```

API endpoints:

- `GET /api/health`
- `GET /api/products`
- `POST /api/orders`

API base URL: http://localhost:3001

### Run All Automated Tests

```bash
npx playwright test tests/cart.spec.ts tests/checkout.spec.ts tests/products-api.spec.ts tests/orders-api.spec.ts
```

Playwright is configured to start the storefront and API automatically when running the tests.

### Run Shopping Cart Tests

```bash
npx playwright test tests/cart.spec.ts
```

### Run Checkout Tests

```bash
npx playwright test tests/checkout.spec.ts
```

### Run API Tests

```bash
npx playwright test tests/products-api.spec.ts tests/orders-api.spec.ts
```

### Run Chromium Tests

```bash
npx playwright test --project=chromium
```

### View HTML Test Report

```bash
npx playwright show-report
```

### Build the Application

```bash
npm run build
```

## Continuous Integration

The project uses **GitHub Actions** to execute automated regression testing on repository changes.

The CI pipeline:

1. Checks out the repository.
2. Configures Node.js.
3. Installs project dependencies.
4. Installs Playwright browsers.
5. Builds the React application.
6. Starts the required application services through Playwright configuration.
7. Executes automated UI and REST API tests.
8. Uploads the Playwright HTML report as a workflow artifact.

[View GitHub Actions](https://github.com/Cycalona-villani/commerceqa-automation/actions)

## Testing Strategy

The project emphasizes risk-based testing of business-critical e-commerce functionality.

Testing includes:

- Positive functional scenarios
- Negative and invalid-input scenarios
- Cart calculations and quantity validation
- Required checkout information
- HTTP response validation
- API response structure validation
- Simulated payment failures
- Duplicate-order request handling
- Regression testing
- Cross-browser UI validation

### Duplicate-Order Protection

The Order API returns simulated order confirmations and includes an in-memory idempotency-key demonstration; it does not persist orders in a database.

A repeated request using the same key and payload returns the original order confirmation rather than creating a new order identifier. Reusing the same key with different order data produces HTTP 409 Conflict.

This implementation is intended for testing and learning. It does not provide persistent storage or production-grade concurrency guarantees.

## Development Roadmap

### Phase 1: Shopping Cart Automation

- [x] Create React + TypeScript application
- [x] Implement product catalog
- [x] Implement cart and quantity management
- [x] Configure Playwright
- [x] Implement CartPage Page Object Model
- [x] Automate four shopping cart scenarios
- [x] Verify cross-browser execution

### Phase 2: Checkout Automation

- [x] Implement checkout form
- [x] Add customer information validation
- [x] Simulate approved and declined payments
- [x] Implement CheckoutPage Page Object Model
- [x] Automate successful and declined checkout
- [x] Automate required-field validation

### Phase 3: Advanced Automation Framework

- [x] Implement REST API with Express
- [x] Add product and health API tests
- [x] Add order creation tests
- [x] Add customer and product validation tests
- [x] Add negative API test scenarios
- [x] Add simulated declined payment testing
- [x] Implement sequential idempotency-key handling
- [x] Add duplicate-order regression tests
- [x] Configure GitHub Actions CI
- [x] Configure automatic application startup
- [x] Generate Playwright reports
- [x] Verify 33 local test executions across four Playwright projects
- [x] Create dedicated Playwright API test project
- [ ] Introduce reusable fixtures
- [ ] Implement reusable test data factories
- [ ] Add additional boundary-value tests
- [ ] Strengthen order processing and concurrency testing

### Phase 4: Professional QA Engineering Practices

- [ ] Document formal test strategy
- [ ] Create requirements traceability matrix
- [ ] Document defects and reproduction steps
- [ ] Demonstrate a simulated legacy-to-Playwright migration
- [ ] Document responsible AI-assisted test development
- [ ] Add test execution screenshots and reports
- [ ] Publish a portfolio case study

## Author

**Cycalona Villani**

Full Stack Developer | QA & Test Automation

[Portfolio](https://cycalona-villani.github.io/cycalona-portfolio/)

[GitHub](https://github.com/Cycalona-villani)
