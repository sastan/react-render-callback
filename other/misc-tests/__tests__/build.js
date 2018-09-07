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

import * as esImport from '../../../dist/react-render-callback.esm'

import * as cjsImport from '../../../' // picks up the main from package.json

import * as umdImport from '../../../dist/react-render-callback.umd'

// intentionally left out because you shouldn't ever
// try to require the ES file in CommonJS
// const esRequire = require('../../../dist/react-render-callback.esm')
const cjsRequire = require('../../../') // picks up the main from package.json
const umdRequire = require('../../../dist/react-render-callback.umd')

test(`import render from 'react-render-callback/dist/react-render-callback.esm'`, () => {
  expect(esImport.default).toBeInstanceOf(Function)
})
test(`import {render} from 'react-render-callback/dist/react-render-callback.esm'`, () => {
  expect(esImport.render).toBeInstanceOf(Function)
})
test(`import {createRender} from 'react-render-callback/dist/react-render-callback.esm'`, () => {
  expect(esImport.createRender).toBeInstanceOf(Function)
})

test(`import render from 'react-render-callback'`, () => {
  expect(cjsImport.default).toBeInstanceOf(Function)
  expect(cjsImport.render).toBeInstanceOf(Function)
  expect(cjsImport.createRender).toBeInstanceOf(Function)
})

test(`import {render} from 'react-render-callback'`, () => {
  expect(cjsImport.render).toBeInstanceOf(Function)
})
test(`import {createRender} from 'react-render-callback'`, () => {
  expect(cjsImport.createRender).toBeInstanceOf(Function)
})

test(`import render from 'react-render-callback/dist/react-render-callback.umd'`, () => {
  expect(umdImport.default).toBeInstanceOf(Function)
  expect(umdImport.render).toBeInstanceOf(Function)
  expect(umdImport.createRender).toBeInstanceOf(Function)
})

test(`const render = require('react-render-callback')`, () => {
  expect(cjsRequire).toBeInstanceOf(Function)
  expect(cjsRequire.render).toBeInstanceOf(Function)
  expect(cjsRequire.createRender).toBeInstanceOf(Function)
})

test(`const render = require('react-render-callback/dist/react-render-callback.umd')`, () => {
  expect(umdRequire).toBeInstanceOf(Function)
  expect(umdRequire.render).toBeInstanceOf(Function)
  expect(umdRequire.createRender).toBeInstanceOf(Function)
})
