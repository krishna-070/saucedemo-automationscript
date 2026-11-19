import { type Locator, type Page } from '@playwright/test';

/** Elements and actions shared by every page behind the login (header, title, cart). */
export abstract class BasePage {
  protected abstract readonly path: string;

  readonly title: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.getByTestId('title');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }

  /** Number shown on the cart badge; 0 when the badge is hidden. */
  async cartCount(): Promise<number> {
    if (!(await this.cartBadge.isVisible())) return 0;
    return Number(await this.cartBadge.textContent());
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
