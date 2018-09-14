import React from 'react'

if (React.createContext) delete React.createContext
if (React.forwardRef) delete React.forwardRef

let reactSymbols

beforeAll(async () => {
  reactSymbols = await import('./reactSymbols')
})

test('react symbols before v16.3.0', () => {
  expect(reactSymbols).toMatchInlineSnapshot(`
Object {
  "REACT_CONTEXT_TYPE": false,
  "REACT_FORWARD_REF_TYPE": false,
  "REACT_PROVIDER_TYPE": false,
}
`)
})
