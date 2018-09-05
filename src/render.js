import {createElement} from 'react'

import isReactComponent from './internal/isReactComponent'

export default (renderable, props) => {
  if (isReactComponent(renderable)) {
    return createElement(renderable, props)
  }

  const element =
    typeof renderable === 'function'
      ? renderable({ ...renderable.defaultProps, ...props})
      : renderable // must be something else

  return element === undefined ? null : element
}
