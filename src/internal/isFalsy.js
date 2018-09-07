export default value =>
  value == null ||
  value === false ||
  value === '' ||
  (typeof value === 'number' && isNaN(value))
