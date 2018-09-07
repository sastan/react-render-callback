import {createElement} from 'react'

import isReactComponent from './internal/isReactComponent'

const isFalsy = value =>
  value == null ||
  value === false ||
  value === '' ||
  (typeof value === 'number' && isNaN(value))

const result = (maybeFunction, props) =>
  typeof maybeFunction === 'function'
    ? maybeFunction({...maybeFunction.defaultProps, ...props})
    : maybeFunction // must be something else

export default (renderable, props) => {
  if (isReactComponent(renderable)) {
    return createElement(renderable, props)
  }

  const element = result(renderable, props)

  return isFalsy(element) ? null : element
}
