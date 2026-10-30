
import { test, expect } from '@playwright/test'

const API_URL = 'http://127.0.0.1:3001'

test.describe('CommerceQA Product API', () => {

  test('API-001: Health endpoint returns OK', async ({ request }) => {
    const response = await request.get(`${API_URL}/api/health`)

    expect(response.status()).toBe(200)
    expect(await response.json()).toEqual({
      status: 'ok'
    })
  })

  test('API-002: Retrieve all products', async ({ request }) => {
    const response = await request.get(`${API_URL}/api/products`)

    expect(response.status()).toBe(200)

    const products = await response.json()

    expect(products).toHaveLength(4)
    expect(products[0].name).toBe('Wireless Headphones')
  })

  test('API-003: Validate product data structure', async ({ request }) => {
    const response = await request.get(`${API_URL}/api/products`)
    const products = await response.json()

    expect(response.status()).toBe(200)

    for (const product of products) {
      expect(product).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
          inStock: expect.any(Boolean)
        })
      )

      expect(product.price).toBeGreaterThan(0)
    }
  })

  test('API-004: Unknown endpoint returns 404', async ({ request }) => {
    const response = await request.get(
      `${API_URL}/api/does-not-exist`
    )

    expect(response.status()).toBe(404)
  })

})
