import {createContext, forwardRef} from 'react'

// React.createContext is available since v16.3.0
const context =
  /*#__PURE__*/ typeof createContext === 'function' &&
  /*#__PURE__*/ createContext()

export const REACT_PROVIDER_TYPE = context && context.Provider.$$typeof

export const REACT_CONTEXT_TYPE = context && context.Consumer.$$typeof

// React.forwardRef is available since v16.3.0
export const REACT_FORWARD_REF_TYPE =
  /*#__PURE__*/ typeof forwardRef === 'function' &&
  /*#__PURE__*/ forwardRef(
    // need to access both params otherwise react warns
    // but as this is never used this is no-op
    /* istanbul ignore next line */
    (props, ref) => ({props, ref}),
  ).$$typeof
