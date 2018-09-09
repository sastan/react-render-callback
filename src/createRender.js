import {isValidElement, createElement, cloneElement} from 'react'

import isPlainObject from 'is-plain-object'

import constant from './internal/constant'
import ignoredValuesToNull from './internal/ignoredValuesToNull'
import isReactComponent from './internal/isReactComponent'

export default (renderable, options) => {
  if (isReactComponent(renderable)) {
    return props => createElement(renderable, props)
  }

  if (typeof renderable === 'function') {
    return (...args) =>
      ignoredValuesToNull(
        renderable.defaultProps && args.length === 1 && isPlainObject(args[0])
          ? renderable({...renderable.defaultProps, ...args[0]})
          : renderable(...args),
      )
  }

  if (options && options.cloneElement && isValidElement(renderable)) {
    return props => cloneElement(renderable, props)
  }

  // must be something else
  return constant(ignoredValuesToNull(renderable))
}
