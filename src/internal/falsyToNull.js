import isFalsy from './isFalsy'

export default render => props => {
  const element = render(props)

  return isFalsy(element) ? null : element
}
