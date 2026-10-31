
import { test as base, expect } from '@playwright/test'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'

type CommerceFixtures = {
  cartPage: CartPage
  checkoutPage: CheckoutPage
}

export const test = base.extend<CommerceFixtures>({
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page)
    await use(cartPage)
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page)
    await use(checkoutPage)
  },
})

export { expect }
