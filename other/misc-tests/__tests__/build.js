/*
 * This file is here to validate that the built version
 * of the library exposes the module in the way that we
 * want it to. Specifically that the ES6 module import can
 * get the render function via default import. Also that
 * the CommonJS require returns the render function
 * (rather than an object that has the render as a
 * `default` property).
 *
 * This file is unable to validate the global export.
 */

 /* eslint-disable import/extensions, import/no-unresolved */

import esImport from '../../../dist/react-render-callback.esm'

import cjsImport from '../../../' // picks up the main from package.json

import umdImport from '../../../dist/react-render-callback.umd'

// intentionally left out because you shouldn't ever
// try to require the ES file in CommonJS
// const esRequire = require('../../../dist/react-render-callback.esm')
const cjsRequire = require('../../../') // picks up the main from package.json
const umdRequire = require('../../../dist/react-render-callback.umd')

test(`import render from 'react-render-callback/dist/react-render-callback.esm'`, () => {
  expect(esImport).toBeInstanceOf(Function)
})

test(`import render from 'react-render-callback'`, () => {
  expect(cjsImport).toBeInstanceOf(Function)
})

test(`import render from 'react-render-callback/dist/react-render-callback.umd'`, () => {
  expect(umdImport).toBeInstanceOf(Function)
})

test(`const render = require('react-render-callback')`, () => {
  expect(cjsRequire).toBeInstanceOf(Function)
})

test(`const render = require('react-render-callback/dist/react-render-callback.umd')`, () => {
  expect(umdRequire).toBeInstanceOf(Function)
})
