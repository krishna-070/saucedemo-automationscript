import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { type Product } from '../data/products';
import { toDataTestId } from '../utils/strings';

export class InventoryPage extends BasePage {
  protected readonly path = '/inventory.html';

  readonly items: Locator;
  readonly itemNames: Locator;

  constructor(page: Page) {
    super(page);
    this.items = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
  }

  async addToCart(product: Product): Promise<void> {
    await this.page.getByTestId(`add-to-cart-${toDataTestId(product.name)}`).click();
  }

  async productNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }
}
