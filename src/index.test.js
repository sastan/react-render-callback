import render from './render'
import createRender from './createRender'

import Export from '.'

test('the default export is render', () => {
  expect(Export).toBe(render)
})

test('named export createRender', () => {
  expect(Export.createRender).toBe(createRender)
})
