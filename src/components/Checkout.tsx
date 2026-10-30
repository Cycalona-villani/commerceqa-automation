
import { useState } from 'react'

type CheckoutProps = {
  total: number
  onOrderComplete: () => void
}

export default function Checkout({
  total,
  onOrderComplete,
}: CheckoutProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [paymentResult, setPaymentResult] = useState('approved')
  const [error, setError] = useState('')

  function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !address.trim()) {
      setError('All fields are required.')
      return
    }

    if (paymentResult === 'declined') {
      setError('Payment declined. Please try another payment method.')
      return
    }

    onOrderComplete()
  }

  return (
    <section className="checkout">
      <h2>Checkout</h2>
      <p>Order Total: ${total.toFixed(2)}</p>

      <form onSubmit={handleCheckout}>
        <label>
          Full Name
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Shipping Address
          <input
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
        </label>

        <label>
          Payment Simulation
          <select
            value={paymentResult}
            onChange={e => setPaymentResult(e.target.value)}
          >
            <option value="approved">Payment Approved</option>
            <option value="declined">Payment Declined</option>
          </select>
        </label>

        {error && <p role="alert">{error}</p>}

        <button type="submit">Place Order</button>
      </form>
    </section>
  )
}
