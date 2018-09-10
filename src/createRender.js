import {isValidElement, createElement, cloneElement} from 'react'

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
        renderable.defaultProps
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
