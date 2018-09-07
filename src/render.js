import createRender from './createRender'

export default (renderable, props, options) =>
  createRender(renderable, options)(props)
