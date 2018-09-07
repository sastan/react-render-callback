# react-render-callback

> render anything (Function as Child, Render Props, Components, Elements, ...)

<hr />

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

View an example live in [codesandbox.io](https://codesandbox.io/s/48k5p1r764).

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
  - [API](#api)
  - [Example](#example)
- [Other Solutions](#other-solutions)
- [Contributors](#contributors)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install --save react-render-callback
```

> This package also depends on `react`. Please make sure you
> have it installed as well.

## Usage

### API

`render([ renderable [, props ] ])`:

- `renderable` (optional): anything that can be rendered like a function, a component, or elements
  - invokes stateless function components (SFC) respecting their
    [`defaultProps`][default-props]
    - not using [`React.createElement`][create-element]
      for improved performance
    - except the SFC has [`propTypes`](typechecking-with-proptypes) and
      `process.env.NODE_ENV` is not `production`, in that case `React.createElement` is used to
      enable typechecking with [PropTypes][prop-types]
  - uses [`React.createElement`][create-element]
    for other [react types][react-is] like
    [class components](https://reactjs.org/docs/react-component.html),
    [context](https://reactjs.org/docs/context.html) provider or consumer,
    [forward refs](https://reactjs.org/docs/react-api.html#reactforwardref),
    [factories](https://reactjs.org/docs/react-api.html#createfactory), ...
  - gracefully handles other types like string, array,
    [react elements][create-element], ...
- `props` (optional): to pass to `renderable` (if renderable is a function or react element type)

**returns**

- `null` for `false`, `null`, `undefined`, `NaN` and an empty string
- the value as is for all other values

### Example

```js
import React from 'react'

import render from 'react-render-callback'

class Component from React.Component {
  state = {
    to: 'pass down'
  }

  render() {
    // can be any prop: return render(this.props.renderHeader, this.state.header)
    return render(this.props.render || this.props.children, this.state)
  }
}

const functionComponent = (props) => <span>{props.to}</span>

class ClassComponent from React.Component {
  render() {
    return <span>{this.props.to}</span>
  }
}

const App = () => (
  <dl>
    <dt>render prop</dt>
    <dd><Component render={functionComponent} /></dd>

    <dt>function as a child</dt>
    <dd><Component>{functionComponent}</Component></dd>

    <dt>render Component</dt>
    <dd><Component render={ClassComponent} /></dd>

    <dt>component as child</dt>
    <dd><Component>{ClassComponent}</Component></dd>

    <dt>plain childs - nothing to pass down - maybe just doing some lifecycle stuff</dt>
    <dd><Component><strong>Plain</strong> childs</Component></dd>
  </dl>
)
```

## Other Solutions

- [`render-props`](https://github.com/donavon/render-props)
- [`react-render-function`](https://www.npmjs.com/package/react-render-function)

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
[typechecking-with-proptypes]: https://reactjs.org/docs/typechecking-with-proptypes.html
[prop-types]: https://www.npmjs.com/package/prop-types
[react-is]: https://www.npmjs.com/package/react-is
