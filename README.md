# CommerceQA Automation

**E-Commerce QA Automation Framework | Playwright | TypeScript | React**

CommerceQA Automation is a hands-on quality engineering portfolio project focused on building and maintaining automated tests for e-commerce shopping cart and checkout workflows.

The project combines a React e-commerce application with a Playwright automation framework to demonstrate functional testing, reusable test architecture, cross-browser validation, and regression testing.

## Current Project Status

**Phase 1 — Shopping Cart Automation Complete**

The application currently supports:

- Product catalog with four products
- Add to Cart functionality
- Multiple products in the cart
- Quantity updates
- Product removal
- Dynamic cart totals

### Automated Test Coverage

| Test ID | Scenario | Browsers |
|---|---|---|
| CART-001 | Add product to cart | Chromium, Firefox, WebKit |
| CART-002 | Add multiple products | Chromium, Firefox, WebKit |
| CART-003 | Update product quantity | Chromium, Firefox, WebKit |
| CART-004 | Remove product from cart | Chromium, Firefox, WebKit |

**Latest confirmed execution:** 12 of 12 automated tests passed in 4.2 seconds across Chromium, Firefox, and WebKit.

**Test coverage:** CART-001, CART-002, CART-003, and CART-004.

## Technology Stack

| Technology | Purpose |
|---|---|
| Playwright | Automated browser testing |
| TypeScript | Type-safe automation |
| React | E-commerce application |
| Vite | Development and build tooling |
| Node.js | JavaScript runtime |
| GitHub | Version control |

## Automation Framework

The project uses the **Page Object Model (POM)** to separate browser interactions from test scenarios.

The `CartPage` class provides reusable methods for:

- Navigating to the application
- Adding products
- Updating quantities
- Removing products
- Validating cart counts
- Validating cart totals

This architecture makes test scenarios easier to read, maintain, and expand.

## Project Structure

```text
commerceqa-automation/
├── pages/
│   └── CartPage.ts
├── src/
│   ├── App.tsx
│   ├── App.css
│   └── index.css
├── tests/
│   ├── cart.spec.ts
│   └── example.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- Playwright-supported browsers

### Installation

Clone the repository:

```bash
git clone https://github.com/Cycalona-villani/commerceqa-automation.git
cd commerceqa-automation
npm install
npx playwright install
```

### Start the Application

```bash
npm run dev
```

The application runs locally at:

`http://localhost:5173/`

### Run Automated Tests

In a second terminal, run:

```bash
npx playwright test tests/cart.spec.ts
```

### View the Playwright Report

```bash
npx playwright show-report
```

### Run Tests in a Specific Browser

```bash
npx playwright test tests/cart.spec.ts --project=chromium
```

## Testing Strategy

CommerceQA focuses on validating business-critical e-commerce functionality through automated tests.

Testing priorities include:

- Functional correctness
- Cart calculations
- User input validation
- Positive and negative scenarios
- Regression coverage
- Cross-browser compatibility
- Reusable automation components

## Development Roadmap

### Phase 1: Shopping Cart
- [x] Create React + TypeScript application
- [x] Install and configure Playwright
- [x] Implement product catalog
- [x] Implement shopping cart functionality
- [x] Create reusable CartPage object
- [x] Automate adding products
- [x] Automate multiple-product scenarios
- [x] Implement quantity changes and product removal
- [x] Add automated scenarios for quantity changes and removal
- [x] Confirm all four scenarios pass across three browsers

### Phase 2: Checkout Automation
- [ ] Implement checkout form
- [ ] Validate customer information
- [ ] Automate successful checkout
- [ ] Test invalid checkout data
- [ ] Simulate payment acceptance and rejection

### Phase 3: Advanced Test Framework
- [ ] Expand Page Object Model
- [ ] Introduce reusable fixtures
- [ ] Add API tests
- [ ] Implement test data management
- [ ] Add negative and boundary testing
- [ ] Configure GitHub Actions CI
- [ ] Document test execution and defects

### Phase 4: Professional QA Practices
- [ ] Build a requirements traceability matrix
- [ ] Document a simulated legacy-to-Playwright migration
- [ ] Demonstrate AI-assisted test development
- [ ] Add test evidence and screenshots
- [ ] Publish a portfolio case study

## Author

**Cycalona Villani**

Full Stack Developer | QA & Test Automation

[Portfolio](https://cycalona-villani.github.io/cycalona-portfolio/)

[GitHub](https://github.com/Cycalona-villani)