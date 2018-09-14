import React from 'react'

// setup react <16.3.0
// https://github.com/facebook/react/blob/master/packages/shared/ReactSymbols.js
// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
const hasSymbol = typeof Symbol === 'function' && Symbol.for

const REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd
const REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace
const REACT_FORWARD_REF_TYPE = hasSymbol
  ? Symbol.for('react.forward_ref')
  : 0xead0

if (!React.createContext) {
  React.createContext = () => ({
    Provider: {$$typeof: REACT_PROVIDER_TYPE},
    Consumer: {$$typeof: REACT_CONTEXT_TYPE},
  })
}

if (!React.forwardRef) {
  React.forwardRef = () => ({$$typeof: REACT_FORWARD_REF_TYPE})
}

let reactSymbols

beforeAll(async () => {
  reactSymbols = await import('./reactSymbols')
})

test('react symbols after v16.3.0', () => {
  expect(reactSymbols).toEqual({
    REACT_CONTEXT_TYPE,
    REACT_FORWARD_REF_TYPE,
    REACT_PROVIDER_TYPE,
  })
})
