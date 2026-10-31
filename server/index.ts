
import express from 'express'

const app = express()
const PORT = 3001


const processedOrders = new Map<
  string,
  {
    fingerprint: string
    orderId: string
    status: string
    message: string
  }
>()


app.use(express.json())

const products = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, inStock: true },
  { id: 2, name: 'Mechanical Keyboard', price: 129.99, inStock: true },
  { id: 3, name: 'Wireless Mouse', price: 39.99, inStock: true },
  { id: 4, name: 'USB-C Hub', price: 49.99, inStock: true },
]

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/products', (_req, res) => {
  res.json(products)
})


app.post('/api/orders', (req, res) => {
  const { customer, items } = req.body ?? {}

  if (
    !customer?.name ||
    !customer?.email ||
    !customer?.address
  ) {
    return res.status(400).json({
      error: 'Customer information is required'
    })
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      error: 'Order must contain at least one item'
    })
  }

  for (const item of items) {
    if (
      typeof item?.quantity !== 'number' ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1
    ) {
      return res.status(400).json({
        error: 'Product quantity must be a positive integer'
      })
    }

    const product = products.find(
      product => product.id === item.productId
    )

    if (!product) {
      return res.status(400).json({
        error: 'Product does not exist'
      })
    }

    if (!product.inStock) {
      return res.status(400).json({
        error: 'Product is out of stock'
      })
    }
  }

  // Simulated payment processing
  const { paymentResult = 'approved' } = req.body

  if (paymentResult === 'declined') {
    return res.status(402).json({
      error: 'Payment declined',
      status: 'payment_failed',
      message: 'Please try another payment method'
    })
  }

  if (paymentResult !== 'approved') {
    return res.status(400).json({
      error: 'Invalid payment result'
    })
  }

  const idempotencyKey = req.get('Idempotency-Key')

  if (idempotencyKey) {
    const fingerprint = JSON.stringify({
      customer,
      items,
      paymentResult
    })

    const previous = processedOrders.get(idempotencyKey)

    if (previous) {
      if (previous.fingerprint !== fingerprint) {
        return res.status(409).json({
          error: 'Idempotency key already used for a different order'
        })
      }

      return res.status(200).json({
        orderId: previous.orderId,
        status: previous.status,
        message: previous.message
      })
    }

    const order = {
      orderId: `ORDER-${crypto.randomUUID()}`,
      status: 'confirmed',
      message: 'Order created successfully'
    }

    processedOrders.set(idempotencyKey, {
      fingerprint,
      ...order
    })

    return res.status(201).json(order)
  }

  // Payment approved - return order confirmation
  return res.status(201).json({
    orderId: `ORDER-${Date.now()}`,
    status: 'confirmed',
    message: 'Order created successfully'
  })
})


app.listen(PORT, () => {
  console.log(`CommerceQA API running at http://localhost:${PORT}`)
})
