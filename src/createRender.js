import {isValidElement, createElement, cloneElement} from 'react'

import isReactComponent from './internal/isReactComponent'
import falsyToNull from './internal/falsyToNull'

export default (renderable, options) => {
  if (isReactComponent(renderable)) {
    return props => createElement(renderable, props)
  }

  if (typeof renderable === 'function') {
    return falsyToNull(props =>
      renderable({...renderable.defaultProps, ...props}),
    )
  }

  if (options && options.cloneElement && isValidElement(renderable)) {
    return props => cloneElement(renderable, props)
  }

  // must be something else
  return falsyToNull(() => renderable)
}
