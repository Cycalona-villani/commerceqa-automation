
import { createCustomer, type Customer } from './customers'

export type OrderItem = {
  productId: number
  quantity: number
}

export type OrderData = {
  customer: Customer
  items: OrderItem[]
  paymentResult: 'approved' | 'declined'
}

export function createOrder(
  overrides: Partial<OrderData> = {}
): OrderData {
  return {
    customer: createCustomer(),
    items: [{ productId: 1, quantity: 1 }],
    paymentResult: 'approved',
    ...overrides
  }
}
