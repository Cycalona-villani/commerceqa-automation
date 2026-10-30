
import { expect, type Page } from '@playwright/test'

export class CartPage {
    constructor(private readonly page: Page) { }

    async goto() {
        await this.page.goto('http://127.0.0.1:5173/')
    }

    async addProduct(productName: string) {
        await this.page.getByRole('button', {
            name: `Add ${productName} to cart`
        }).click()
    }

    async expectCartCount(count: number) {
        await expect(
            this.page.getByTestId('cart-count')
        ).toHaveText(`Cart: ${count} items`)
    }

    async expectCartTotal(total: number) {
        await expect(
            this.page.getByTestId('cart-total')
        ).toHaveText(`Total: $${total.toFixed(2)}`)
    }

    async updateProductQuantity(productName: string, quantity: number) {
        await this.page.getByRole('spinbutton', {
            name: `Quantity for ${productName}`
        }).fill(quantity.toString())
    }

    async removeProduct() {
        await this.page.getByRole('button', {
            name: 'Remove'
        }).click()
    }

}
