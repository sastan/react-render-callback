import render from './render'
import createRender from './createRender'

import * as Export from './esm-entry'

test('the default export is render', () => {
  expect(Export.default).toBe(render)
})
test('named export createRender', () => {
  expect(Export.createRender).toBe(createRender)
})
