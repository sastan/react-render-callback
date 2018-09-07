import {isValidElement, createElement, cloneElement} from 'react'

import isReactComponent from './internal/isReactComponent'

const isFalsy = value =>
  value == null ||
  value === false ||
  value === '' ||
  (typeof value === 'number' && isNaN(value))

const result = (maybeFunction, props, options) => {
  if (typeof maybeFunction === 'function') {
    return maybeFunction({...maybeFunction.defaultProps, ...props})
  }

  if (
    options &&
    options.cloneElement &&
    props &&
    isValidElement(maybeFunction)
  ) {
    return cloneElement(maybeFunction, props)
  }

  return maybeFunction // must be something else
}

export default (renderable, props, options) => {
  if (isReactComponent(renderable)) {
    return createElement(renderable, props)
  }

  const element = result(renderable, props, options)

  return isFalsy(element) ? null : element
}
