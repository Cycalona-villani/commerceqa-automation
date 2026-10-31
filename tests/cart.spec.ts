
import { test, expect } from '../fixtures/test'

test.describe('Shopping Cart Tests', () => {
  test.beforeEach(async ({ cartPage }) => {
    await cartPage.goto()
  })

  test('CART-001: Add product to cart', async ({ cartPage }) => {
    await cartPage.expectCartCount(0)

    await cartPage.addProduct('Wireless Headphones')

    await cartPage.expectCartCount(1)
    await cartPage.expectCartTotal(79.99)
  })

  test('CART-002: Add multiple products', async ({ cartPage }) => {
    await cartPage.addProduct('Wireless Headphones')
    await cartPage.addProduct('Wireless Mouse')

    await cartPage.expectCartCount(2)
    await cartPage.expectCartTotal(119.98)
  })

  test('CART-003: Update product quantity', async ({ cartPage }) => {
    await cartPage.addProduct('Wireless Headphones')

    await cartPage.updateProductQuantity('Wireless Headphones', 2)

    await cartPage.expectCartCount(2)
    await cartPage.expectCartTotal(159.98)
  })

  test('CART-004: Remove product from cart', async ({ cartPage, page }) => {
    await cartPage.addProduct('Wireless Headphones')

    await cartPage.expectCartCount(1)
    await cartPage.removeProduct()

    await cartPage.expectCartCount(0)
    await cartPage.expectCartTotal(0)

    await expect(
      page.getByText('Your cart is empty.')
    ).toBeVisible()
  })
})
