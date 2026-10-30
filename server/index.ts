
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

app.listen(PORT, () => {
  console.log(`CommerceQA API running at http://localhost:${PORT}`)
})
