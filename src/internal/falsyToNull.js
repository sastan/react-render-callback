import isFalsy from './isFalsy'

export default value => (isFalsy(value) ? null : value)
