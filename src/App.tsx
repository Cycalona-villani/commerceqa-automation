
import { useState } from 'react'
import Checkout from './components/Checkout'
import './App.css'

const products = [
  { id: 1, name: 'Wireless Headphones', price: 79.99 },
  { id: 2, name: 'Mechanical Keyboard', price: 129.99 },
  { id: 3, name: 'Wireless Mouse', price: 39.99 },
  { id: 4, name: 'USB-C Hub', price: 49.99 },
]

type Product = typeof products[number]
type CartItem = Product & { quantity: number }

function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [orderComplete, setOrderComplete] = useState(false)

  function addToCart(product: Product) {
    setCart(current => {
      const existing = current.find(item => item.id === product.id)

      if (existing) {
        return current.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...current, { ...product, quantity: 1 }]
    })
  }

  function updateQuantity(id: number, quantity: number) {
    if (quantity < 1) return

    setCart(current =>
      current.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  function removeFromCart(id: number) {
    setCart(current => current.filter(item => item.id !== id))
  }

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  )

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  return (
    <main className="store">
      <header className="store-header">
        <h1>CommerceQA Store</h1>
        <p>E-Commerce Testing Demo</p>
        <span data-testid="cart-count">
          Cart: {itemCount} items
        </span>
      </header>

      <h2>Our Products</h2>

      <section className="product-grid">
        {products.map(product => (
          <article className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              aria-label={`Add ${product.name} to cart`}
            >
              Add to Cart
            </button>
          </article>
        ))}
      </section>

      <section className="cart-summary">
        <h2>Shopping Cart</h2>

        {cart.length === 0 && <p>Your cart is empty.</p>}

        {cart.map(item => (
          <div className="cart-item" key={item.id}>
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)} each</p>

            <label>
              Quantity:
              <input
                type="number"
                min="1"
                aria-label={`Quantity for ${item.name}`}
                value={item.quantity}
                onChange={e =>
                  updateQuantity(item.id, Number(e.target.value))
                }
              />
            </label>

            <button onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))}

        <h3 data-testid="cart-total">
          Total: ${total.toFixed(2)}
        </h3>
      </section>
      {cart.length > 0 && !orderComplete && (
        <Checkout
          total={total}
          onOrderComplete={() => {
            setCart([])
            setOrderComplete(true)
          }}
        />
      )}

      {orderComplete && (
        <div role="status" data-testid="order-confirmation">
          Order placed successfully!
        </div>
      )}
    </main>
  )
}

export default App
