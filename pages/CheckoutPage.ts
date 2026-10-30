
import { expect, type Page } from '@playwright/test'

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async enterCustomerInformation(
    name: string,
    email: string,
    address: string
  ) {
    await this.page.getByRole('textbox', {
      name: 'Full Name'
    }).fill(name)

    await this.page.getByRole('textbox', {
      name: 'Email'
    }).fill(email)

    await this.page.getByRole('textbox', {
      name: 'Shipping Address'
    }).fill(address)
  }

  async selectPaymentResult(result: 'approved' | 'declined') {
    await this.page.getByLabel('Payment Simulation')
      .selectOption(result)
  }

  async placeOrder() {
    await this.page.getByRole('button', {
      name: 'Place Order'
    }).click()
  }

  async expectSuccessfulOrder() {
    await expect(
      this.page.getByTestId('order-confirmation')
    ).toHaveText('Order placed successfully!')
  }

  async expectPaymentDeclined() {
    await expect(
      this.page.getByRole('alert')
    ).toHaveText(
      'Payment declined. Please try another payment method.'
    )
  }
}
