
import { test, expect } from '@playwright/test'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'

test.describe('Checkout Tests', () => {
  let cartPage: CartPage
  let checkoutPage: CheckoutPage

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page)
    checkoutPage = new CheckoutPage(page)

    await cartPage.goto()
    await cartPage.addProduct('Wireless Headphones')
  })

  test('CHECK-001: Successful checkout', async () => {
    await checkoutPage.enterCustomerInformation(
      'Jane Smith',
      'jane@example.com',
      '123 Test Street'
    )

    await checkoutPage.selectPaymentResult('approved')
    await checkoutPage.placeOrder()

    await checkoutPage.expectSuccessfulOrder()
    await cartPage.expectCartCount(0)
    await cartPage.expectCartTotal(0)
  })

  test('CHECK-002: Declined payment', async () => {
    await checkoutPage.enterCustomerInformation(
      'Jane Smith',
      'jane@example.com',
      '123 Test Street'
    )

    await checkoutPage.selectPaymentResult('declined')
    await checkoutPage.placeOrder()

    await checkoutPage.expectPaymentDeclined()
    await cartPage.expectCartCount(1)
    await cartPage.expectCartTotal(79.99)
  })

  test('CHECK-003: Required field validation', async ({ page }) => {
    await checkoutPage.placeOrder()

    await expect(
      page.getByRole('textbox', { name: 'Full Name' })
    ).toBeFocused()

    await cartPage.expectCartCount(1)
  })
})
