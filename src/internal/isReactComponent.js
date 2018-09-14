import {
  REACT_PROVIDER_TYPE,
  REACT_CONTEXT_TYPE,
  REACT_FORWARD_REF_TYPE,
} from './reactSymbols'

export default renderable => {
  if (renderable == null) return false

  const type = typeof renderable

  if (type === 'string') return false

  if (type === 'function') {
    return !!(
      (renderable.prototype && renderable.prototype.isReactComponent) ||
      // eslint-disable-next-line react/forbid-foreign-prop-types
      (process.env.NODE_ENV !== 'production' && renderable.propTypes)
    )
  }

  return (
    type === 'object' &&
    renderable.$$typeof &&
    (renderable.$$typeof === REACT_PROVIDER_TYPE ||
      renderable.$$typeof === REACT_CONTEXT_TYPE ||
      renderable.$$typeof === REACT_FORWARD_REF_TYPE)
  )
}
