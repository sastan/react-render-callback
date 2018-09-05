import render from './render'

import defaultExport from '.'

test('the default export is render', () => {
  expect(defaultExport).toBe(render)
})