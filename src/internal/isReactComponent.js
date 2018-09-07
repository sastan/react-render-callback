import {isValidElementType} from 'react-is'

export default renderable => {
  const type = typeof renderable

  if (type === 'string') return false

  if (type === 'function') {
    return !!(
      (renderable.prototype && renderable.prototype.isReactComponent) ||
      // eslint-disable-next-line react/forbid-foreign-prop-types
      (process.env.NODE_ENV !== 'production' && renderable.propTypes)
    )
  }

  return isValidElementType(renderable)
}
