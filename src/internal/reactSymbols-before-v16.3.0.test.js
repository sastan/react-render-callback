import React from 'react'

React.createContext = undefined
React.forwardRef = undefined

let reactSymbols

beforeAll(async () => {
  reactSymbols = await import('./reactSymbols')
})

test('react symbols before v16.3.0', () => {
  expect(reactSymbols).toMatchInlineSnapshot(`
Object {
  "REACT_CONTEXT_TYPE": undefined,
  "REACT_FORWARD_REF_TYPE": undefined,
  "REACT_PROVIDER_TYPE": undefined,
}
`)
})
