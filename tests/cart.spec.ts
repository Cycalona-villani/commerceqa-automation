
import { test, expect } from '@playwright/test'
import { CartPage } from '../pages/CartPage'

test.describe('Shopping Cart Tests', () => {
    let cartPage: CartPage

    test.beforeEach(async ({ page }) => {
        cartPage = new CartPage(page)
        await cartPage.goto()
    })

    test('CART-001: Add product to cart', async () => {
        await cartPage.expectCartCount(0)

        await cartPage.addProduct('Wireless Headphones')

        await cartPage.expectCartCount(1)
        await cartPage.expectCartTotal(79.99)
    })

    test('CART-002: Add multiple products', async () => {
        await cartPage.addProduct('Wireless Headphones')
        await cartPage.addProduct('Wireless Mouse')

        await cartPage.expectCartCount(2)
        await cartPage.expectCartTotal(119.98)
    })


    test('CART-003: Update product quantity', async () => {
        await cartPage.addProduct('Wireless Headphones')

        // Change quantity from 1 to 2
        await cartPage.updateProductQuantity('Wireless Headphones', 2)

        // Verify quantity and total
        await cartPage.expectCartCount(2)
        await cartPage.expectCartTotal(159.98)
    })

    test('CART-004: Remove product from cart', async ({ page }) => {
        await cartPage.addProduct('Wireless Headphones')

        await cartPage.expectCartCount(1)

        // Remove the product
        await cartPage.removeProduct()

        // Verify cart is empty
        await cartPage.expectCartCount(0)
        await cartPage.expectCartTotal(0)

        await expect(
            page.getByText('Your cart is empty.')
        ).toBeVisible()
    })

})
