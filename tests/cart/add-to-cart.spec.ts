import { test, expect } from '../../src/fixtures/test';
import { PRODUCTS } from '../../src/data/products';

test.describe('Cart', () => {
  test('add a single product to the cart', { tag: ['@DEMOTC-3', '@smoke'] }, async ({ loggedIn, cartPage }) => {
    await loggedIn.addToCart(PRODUCTS.backpack);
    expect(await loggedIn.cartCount()).toBe(1);

    await loggedIn.openCart();
    expect(await cartPage.itemNames()).toEqual([PRODUCTS.backpack.name]);
  });
});
