# react-render-callback

> render anything (Function as Child, Render Props, Components, Elements, ...)

---

[![version][version-badge]][package]
[![MIT License][license-badge]][license]
[![module formats: umd, cjs, and es][module-formats-badge]][unpkg-dist]
[![umd size][size-badge]][unpkg-dist]
[![umd gzip size][gzip-badge]][unpkg-dist]

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![Maintainability][maintainability-badge]][maintainability]
[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]

[![Sponsored by Kenoxa][sponsored-by-badge]][sponsored-by]
[![Semver][semver-badge]][semver]
[![semantic-release][semantic-release-badge]][semantic-release]
[![Greenkeeper badge][greenkeeper-badge]][greenkeeper]

## The problem

You want your component to support the [`render prop`][render-prop] [pattern][use-a-render-prop]
and you want to support several different types of values like
[Function as children][function-as-children],
a [React.Component][react-component]
or just plain react elements.

## This solution

`react-render-callback` frees you from detecting what kind of callback your component is dealing with:

```js
import React from 'react'

import render from 'react-render-callback'

class Component from React.Component {
  state = {}

  render() {
    // can be any prop: return render(this.props.renderHeader, this.state.header)
    return render(this.props.children, this.state)
  }
}
```

It can render the following types:

- [Stateless Function Components (SFC)](https://reactjs.org/docs/components-and-props.html#functional-and-class-components)
  with one argument (the common `props` case)
  or [optional with several arguments](#use-createrender-to-pass-down-several-arguments)
- [Class Components](https://reactjs.org/docs/react-component.html)
- [Context](https://reactjs.org/docs/context.html) Provider and Consumer
- [Forward Refs](https://reactjs.org/docs/react-api.html#reactforwardref)
- [Factories](https://reactjs.org/docs/react-api.html#createfactory)
- [Elements](https://reactjs.org/docs/glossary.html#elements)
  with [optional support](#use-optionscloneelement) for [cloning][clone-element] to merge props
- primitives like strings, numbers, arrays, ...
- `false`, `null`, `undefined` and `true` are returned as `null`
  just like in [JSX](https://reactjs.org/docs/jsx-in-depth.html#booleans-null-and-undefined-are-ignored)

View an example in [codesandbox.io](https://codesandbox.io/s/48k5p1r764?module=%2FApp.js).

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
  - [API](#api)
  - [Examples](#examples)
- [Other Solutions](#other-solutions)
- [Credits](#credits)
- [Contributors](#contributors)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```sh
npm install --save react-render-callback
```

> This package also depends on `react`. Please make sure you
> have it installed as well.

The [Universal Module Definition (UMD)](https://github.com/umdjs/umd) is available
via [unpkg.com](https://unpkg.com/) and exposed as `ReactRenderCallback`.

```html
<script src="https://unpkg.com/react-render-callback/dist/react-render-callback.umd.min.js"></script>
```

## Usage

### API

#### `render([ renderable [, props [, options ] ] ])`

> renders the given `renderable` with `props`

```js
// esm
import render from 'react-render-callback'
// commonjs
const render = require('react-render-callback')
```

- `renderable` (optional): anything that can be rendered like a function, a component, or elements
  - uses [`React.createElement`][create-element]
    for react types like
    [class components](https://reactjs.org/docs/react-component.html),
    [context](https://reactjs.org/docs/context.html) provider or consumer,
    [forward refs](https://reactjs.org/docs/react-api.html#reactforwardref),
    [factories](https://reactjs.org/docs/react-api.html#createfactory), ...
  - invokes stateless function components (SFC) respecting their
    [`defaultProps`][default-props]
    - not using [`React.createElement`][create-element]
      for improved performance
    - except the SFC has [`propTypes`](typechecking-with-proptypes) and
      `process.env.NODE_ENV` is not `production`, in that case `React.createElement` is used to
      enable typechecking with [PropTypes][prop-types]
  - gracefully handles other types like string, array,
    [react elements][create-element], ...
- `props` (optional): to pass to `renderable` (if renderable is a function or react element type)
- `options` (optional):
  - `cloneElement` (default: `false`, since: v1.1.0): allows to pass props to
    the element using [`React.cloneElement`][clone-element]


    ```js
    render(<a href="#bar">bar</a>, {title: 'foo'})
    // --> <a href="#bar">bar</a>

    render(<a href="#bar">bar</a>, {title: 'foo'}, {cloneElement: true})
    // --> <a href="#bar" title="foo">bar</a>
    ```

**returns**

- `false`, `null`, `undefined` and `true` are returned as `null`
  just like in [JSX](https://reactjs.org/docs/jsx-in-depth.html#booleans-null-and-undefined-are-ignored)
- the value as is for all other values

#### `createRender([ renderable [, options ] ])`

since: v1.1.0

> Returns a function (`(...args) => ...`) to render `renderable` with.

```js
// esm
import {createRender} from 'react-render-callback'
// commonjs
const {createRender} = require('react-render-callback')
```

Accepts the same arguments (except `props`) as `render()`. It exists mainly
to pre-determine (read cache) what type `renderable` is, to prevent these
checks on every invocation.

Additionally the returned method accepts more than one argument (since: v1.2.0).
This allows to provide several parameters to the render function.

```js
const render = createRender((a, b, c) => ({a, b, c}))
render(1, 2, 3)
// -> { a: 1, b: 2, c: 3 }
```

If only one argument is passed and it is a plain object, that argument is merged
with (if defined) the `defaultProps` of the `renderable`.

**returns**

a function (`(...args) => ...`)

### Examples

A basic example showing the can be viewed at [codesandbox.io](https://codesandbox.io/s/48k5p1r764?module=%2FApp.js).

#### Use `options.cloneElement`

[![Edit](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mj5py581oy)

> This option allows to pass down props without to need to create a function
> within render which merges the parent and received props.

```js
class CountSeconds extends React.Component {
  state = {
    value: 0,
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(({value}) => ({value: value + 1}))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const {children, render = children} = this.props
    return renderCallback(render, this.state, {cloneElement: true})
  }
}

const DisplayValue = ({prefix = '', value}) => `${prefix}${value}`

const App = ({prefix}) => (
  <CountSeconds>
    <DisplayValue prefix={prefix} />
  </CountSeconds>
)
```

#### Use `createRender` to pass down several arguments

[![Edit](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/x3j0pxl4lw)

```js
class CountSeconds extends React.Component {
  state = {
    value: 0,
  }

  reset = () => {
    this.setState({value: 0})
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(({value}) => ({value: value + 1}))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const {children, render = children} = this.props
    return createRender(render)(this.state.value, this.reset)
  }
}

const DisplayValue = ({prefix = '', value}) => `${prefix}${value}`

const App = () => (
  <CountSeconds>
    {(value, reset) => (
      <React.Fragment>
        <DisplayValue prefix="Seconds: " value={value} />
        <button onClick={reset} type="button">
          reset
        </button>
      </React.Fragment>
    )}
  </CountSeconds>
)
```

#### Use `createRender` to interop with a library which only supports function as render-prop

[![Edit](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/1qyqwq14jq)

```js
import Toggle from 'react-toggled'

const Toggler = ({on, getTogglerProps, onLabel, offLabel}) => (
  <div>
    <button {...getTogglerProps()}>Toggle me</button>
    <div>{on ? onLabel : offLabel}</div>
  </div>
)

Toggler.defaultProps = {
  onLabel: 'Toggled On',
  offLabel: 'Toggled Off',
}

const ToggleView = createRender(Toggler)

const App = () => <Toggle>{ToggleView}</Toggle>
```

## Other Solutions

- [`render-props`](https://github.com/donavon/render-props)
- [`react-render-function`](https://www.npmjs.com/package/react-render-function)
- [`@macklinu/render-props`](https://www.npmjs.com/package/@macklinu/render-props)

## Credits

A special thanks needs to go to [Kent C. Dodds](https://github.com/kentcdodds) for his great
video series (
[egghead.io](https://egghead.io/instructors/kentcdodds),
[frontendmasters.com](https://frontendmasters.com/teachers/kentcdodds/) and
[youtube.com](https://www.youtube.com/c/kentcdodds-vids)).
His projects are either used in this project ([kcd-scripts](https://github.com/kentcdodds/kcd-scripts))
or are a template for the structure of this project ([downshift](https://github.com/paypal/downshift)).
Make sure to [subscribe](https://buttondown.email/kentcdodds) to his newsletter.

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| <img src="https://avatars.githubusercontent.com/u/514405?v=3" width="100px;"/><br /><sub><b>Sascha Tandel</b></sub><br />[💻](https://github.com/sastan/react-render-callback/commits?author=sastan "Code") [📖](https://github.com/sastan/react-render-callback/commits?author=sastan "Documentation") [🚇](#infra-sastan "Infrastructure (Hosting, Build-Tools, etc)") [⚠️](https://github.com/sastan/react-render-callback/commits?author=sastan "Tests") [👀](#review-sastan "Reviewed Pull Requests") [📝](#blog-sastan "Blogposts") [🐛](https://github.com/sastan/react-render-callback/issues?q=author%3Asastan "Bug reports") [💡](#example-sastan "Examples") [🤔](#ideas-sastan "Ideas, Planning, & Feedback") [📢](#talk-sastan "Talks") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/sastan/react-render-callback.svg?style=flat-square
[build]: https://travis-ci.org/sastan/react-render-callback
[coverage-badge]: https://img.shields.io/codecov/c/github/sastan/react-render-callback.svg?style=flat-square
[coverage]: https://codecov.io/github/sastan/react-render-callback
[version-badge]: https://img.shields.io/npm/v/react-render-callback.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-render-callback
[npmcharts]: http://npmcharts.com/compare/react-render-callback
[license-badge]: https://img.shields.io/npm/l/react-render-callback.svg?style=flat-square
[license]: https://github.com/sastan/react-render-callback/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/sastan/react-render-callback/blob/master/CODE_OF_CONDUCT.md
[gzip-badge]: http://img.badgesize.io/https://unpkg.com/react-render-callback/dist/react-render-callback.umd.min.js?compression=gzip&label=umd%20gzip%20size&style=flat-square
[size-badge]: http://img.badgesize.io/https://unpkg.com/react-render-callback/dist/react-render-callback.umd.min.js?label=umd%20size&style=flat-square
[unpkg-dist]: https://unpkg.com/react-render-callback/dist/
[module-formats-badge]: https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20es-green.svg?style=flat-square
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[maintainability]: https://codeclimate.com/github/sastan/react-render-callback/maintainability
[maintainability-badge]: https://api.codeclimate.com/v1/badges/bdb9f3ea6d70b6181b33/maintainability
[sponsored-by]: https://www.kenoxa.com
[sponsored-by-badge]: https://img.shields.io/badge/Sponsored%20by-Kenoxa-blue.svg
[all-contributors]: https://github.com/kentcdodds/all-contributors
[semantic-release]: https://github.com/semantic-release/semantic-release
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[greenkeeper]: https://greenkeeper.io/
[greenkeeper-badge]: https://badges.greenkeeper.io/sastan/react-render-callback.svg
[semver]: http://semver.org/spec/v2.0.0.html
[semver-badge]: https://img.shields.io/badge/SemVer-2.0.0-green.svg
[use-a-render-prop]: https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce
[default-props]: https://reactjs.org/docs/react-component.html#defaultprops
[render-prop]: https://reactjs.org/docs/render-props.html
[function-as-children]: https://reactpatterns.com/#function-as-children
[react-component]: https://reactjs.org/docs/react-component.html
[create-element]: https://reactjs.org/docs/react-api.html#createelement
[clone-element]: https://reactjs.org/docs/react-api.html#cloneelement
[typechecking-with-proptypes]: https://reactjs.org/docs/typechecking-with-proptypes.html
[prop-types]: https://www.npmjs.com/package/prop-types
