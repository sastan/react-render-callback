import isIgnored from './isIgnored'

export default value => (isIgnored(value) ? null : value)
