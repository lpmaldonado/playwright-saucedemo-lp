# playwright-saucedemo-lp
# Playwright SauceDemo POM JS

Welcome to Leidy Pineda's repository, answering the QA Automation Engineer assessment questions. This README will show you how to configure and execute the tests.

---

## 📦 Prerequisites

* **Node.js** v16 or higher
* **npm** (comes with Node.js)
* **Git** (for version control)

---

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd playwright-saucedemo-pom-js
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Download browsers**

   ```bash
   npx playwright install
   ```

---

## 🚀 Running Tests

* **Headless (CI-friendly)**

  ```bash
  npm test
  ```

* **Headed (interactive/demo)**

  ```bash
  npx playwright test --headed
  ```

* **Run a single spec file**

  ```bash
  npx playwright test tests/completePurchase.spec.js
  ```

---

## 🏗 Project Structure

```
playwright-saucedemo-pom-js/
├── pages/                 # Page Object Model classes
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   └── CartPage.js
├── tests/                 # Test suites
│   ├── completePurchase.spec.js       # 1. Successful Transaction
│   ├── uiAnomaly.spec.js              # 2. UI Anomaly Handling
│   └── cartTotalIntegrity.spec.js     # 3. Data Integrity of Cart Totals
├── .gitignore             # Ignored files 
├── package.json           # Project metadata & scripts
├── playwright.config.js   # Global Playwright configuration
└── README.md              # This file
```
