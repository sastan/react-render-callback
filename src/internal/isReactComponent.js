import {isValidElementType} from 'react-is'

import {isDev} from './env'

export default renderable => {
  const type = typeof renderable

  if (type === 'string') return false

  if (type === 'function') {
    return !!(
      (renderable.prototype && renderable.prototype.isReactComponent) ||
      // eslint-disable-next-line react/forbid-foreign-prop-types
      (isDev && renderable.propTypes)
    )
  }

  return isValidElementType(renderable)
}
