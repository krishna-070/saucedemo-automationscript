# SDET360 Demo Automation Framework

UI automation for the [Swag Labs demo shop](https://www.saucedemo.com), written with **Playwright + TypeScript** using the **Page Object Model**.

## Setup

```
npm install
npx playwright install chromium
```

## Run

```
npm test                                   # all tests
npm run test:smoke                         # @smoke tests only
npx playwright test --grep "@DEMOTC-1"    # one test case by its SDET360 ID
npm run test:headed                        # watch the browser
npm run report                             # open the last HTML report
```

## Structure

```
src/
  pages/        Page objects. All extend BasePage (title, cart badge, cart link, goto)
  fixtures/     test.ts: custom `test` with page-object fixtures and the `loggedIn` fixture
  data/         Test data (users, products)
  utils/        Shared helpers (toDataTestId, parsePrice)
tests/
  <feature>/    One folder per feature, one *.spec.ts per area
```

## Conventions

- **Always import `test` and `expect` from `src/fixtures/test`**, never directly from `@playwright/test`.
- Use the `loggedIn` fixture for anything behind the login instead of logging in inside the test.
- **Locators live in page objects only.** Tests call page-object methods and assert on page-object locators.
- Locate elements with `page.getByTestId(...)` (mapped to the app's `data-test` attribute).
- New pages extend `BasePage`, set `path`, define locators in the constructor, and get a fixture in `src/fixtures/test.ts`.
- Test data goes in `src/data`. Do not hard-code users, products or customer details in tests.
- **Every test is tagged with its SDET360 test case ID**, e.g. `{ tag: ['@DEMOTC-1', '@smoke'] }`. Add `@smoke` for critical-path tests.

## Coverage

| SDET360 ID | Test | File |
|---|---|---|
| DEMOTC-1 | Standard user can log in | `tests/login/login.spec.ts` |
| DEMOTC-2 | Login fails with an invalid password | `tests/login/login.spec.ts` |
| DEMOTC-3 | Add a single product to the cart | `tests/cart/add-to-cart.spec.ts` |
| SDTC-8 | Cart badge count updates when adding multiple products | `tests/cart/cart-badge-count.spec.ts` |

Not automated yet: checkout, removing items from the cart, product sorting, logout, locked-out user.
