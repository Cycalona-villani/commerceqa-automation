
export type Customer = {
  name: string
  email: string
  address: string
}

export const validCustomer: Customer = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  address: '123 Test Street'
}

export function createCustomer(
  overrides: Partial<Customer> = {}
): Customer {
  return {
    ...validCustomer,
    ...overrides
  }
}
