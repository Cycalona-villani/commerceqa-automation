
import { test, expect } from '@playwright/test'

const API_URL = 'http://127.0.0.1:3001'

test.describe('CommerceQA Order API', () => {

  test('ORDER-001: Create a valid order', async ({ request }) => {
    const response = await request.post(`${API_URL}/api/orders`, {
      data: {
        customer: {
          name: 'Jane Smith',
          email: 'jane@example.com',
          address: '123 Test Street'
        },
        items: [
          { productId: 1, quantity: 1 }
        ]
      }
    })

    expect(response.status()).toBe(201)

    const order = await response.json()

    expect(order.status).toBe('confirmed')
    expect(order.orderId).toMatch(/^ORDER-/)
    expect(order.message).toBe('Order created successfully')
  })

  test('ORDER-002: Reject missing customer information', async ({ request }) => {
    const response = await request.post(`${API_URL}/api/orders`, {
      data: {
        customer: {},
        items: [
          { productId: 1, quantity: 1 }
        ]
      }
    })

    expect(response.status()).toBe(400)

    const body = await response.json()

    expect(body.error).toBe('Customer information is required')
  })

  test('ORDER-003: Reject an empty shopping cart', async ({ request }) => {
    const response = await request.post(`${API_URL}/api/orders`, {
      data: {
        customer: {
          name: 'Jane Smith',
          email: 'jane@example.com',
          address: '123 Test Street'
        },
        items: []
      }
    })

    expect(response.status()).toBe(400)

    const body = await response.json()

    expect(body.error).toBe('Order must contain at least one item')
  })

})

test('ORDER-004: Reject invalid product quantity', async ({ request }) => {
  const response = await request.post(`${API_URL}/api/orders`, {
    data: {
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        address: '123 Test Street'
      },
      items: [
        { productId: 1, quantity: 0 }
      ]
    }
  })

  expect(response.status()).toBe(400)

  expect(await response.json()).toEqual({
    error: 'Product quantity must be a positive integer'
  })
})


test('ORDER-005: Reject nonexistent product', async ({ request }) => {
  const response = await request.post(`${API_URL}/api/orders`, {
    data: {
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        address: '123 Test Street'
      },
      items: [
        { productId: 9999, quantity: 1 }
      ]
    }
  })

  expect(response.status()).toBe(400)

  expect(await response.json()).toEqual({
    error: 'Product does not exist'
  })
})

test('ORDER-006: Reject declined payment', async ({ request }) => {
  const response = await request.post(`${API_URL}/api/orders`, {
    data: {
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        address: '123 Test Street'
      },
      items: [
        { productId: 1, quantity: 1 }
      ],
      paymentResult: 'declined'
    }
  })

  expect(response.status()).toBe(402)

  const body = await response.json()

  expect(body).toEqual({
    error: 'Payment declined',
    status: 'payment_failed',
    message: 'Please try another payment method'
  })

  expect(body).not.toHaveProperty('orderId')
})


test('ORDER-007: Prevent duplicate order submission', async ({ request }) => {
  const idempotencyKey = crypto.randomUUID()

  const orderData = {
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      address: '123 Test Street'
    },
    items: [
      { productId: 1, quantity: 1 }
    ],
    paymentResult: 'approved'
  }

  const firstResponse = await request.post(
    `${API_URL}/api/orders`,
    {
      headers: { 'Idempotency-Key': idempotencyKey },
      data: orderData
    }
  )

  expect(firstResponse.status()).toBe(201)
  const firstOrder = await firstResponse.json()

  const secondResponse = await request.post(
    `${API_URL}/api/orders`,
    {
      headers: { 'Idempotency-Key': idempotencyKey },
      data: orderData
    }
  )

  expect(secondResponse.status()).toBe(200)
  const secondOrder = await secondResponse.json()

  expect(secondOrder.orderId).toBe(firstOrder.orderId)
  expect(secondOrder).toEqual(firstOrder)
})


test('ORDER-008: Reject reused key with different order data', async ({ request }) => {
  const idempotencyKey = crypto.randomUUID()

  const customer = {
    name: 'Jane Smith',
    email: 'jane@example.com',
    address: '123 Test Street'
  }

  const firstResponse = await request.post(`${API_URL}/api/orders`, {
    headers: { 'Idempotency-Key': idempotencyKey },
    data: {
      customer,
      items: [{ productId: 1, quantity: 1 }],
      paymentResult: 'approved'
    }
  })

  expect(firstResponse.status()).toBe(201)

  const secondResponse = await request.post(`${API_URL}/api/orders`, {
    headers: { 'Idempotency-Key': idempotencyKey },
    data: {
      customer,
      items: [{ productId: 1, quantity: 2 }],
      paymentResult: 'approved'
    }
  })

  expect(secondResponse.status()).toBe(409)

  expect(await secondResponse.json()).toEqual({
    error: 'Idempotency key already used for a different order'
  })
})


