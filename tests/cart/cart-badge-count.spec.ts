import { test, expect } from '../../src/fixtures/test';
import { PRODUCTS } from '../../src/data/products';

test.describe('Cart', () => {
  test('cart badge count updates when adding multiple products', { tag: '@SDTC-8' }, async ({ loggedIn, cartPage }) => {
    await expect(loggedIn.cartBadge).toBeHidden();

    await loggedIn.addToCart(PRODUCTS.backpack);
    expect(await loggedIn.cartCount()).toBe(1);

    await loggedIn.addToCart(PRODUCTS.bikeLight);
    expect(await loggedIn.cartCount()).toBe(2);

    await loggedIn.addToCart(PRODUCTS.onesie);
    expect(await loggedIn.cartCount()).toBe(3);

    await loggedIn.openCart();
    expect(await cartPage.itemNames()).toEqual([
      PRODUCTS.backpack.name,
      PRODUCTS.bikeLight.name,
      PRODUCTS.onesie.name,
    ]);
  });
});
