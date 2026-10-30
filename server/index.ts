
import express from 'express'

const app = express()
const PORT = 3001

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


  return res.status(201).json({
    orderId: `ORDER-${Date.now()}`,
    status: 'confirmed',
    message: 'Order created successfully'
  })
})


app.listen(PORT, () => {
  console.log(`CommerceQA API running at http://localhost:${PORT}`)
})
