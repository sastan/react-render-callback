# react-render-callback

> render anything (Function as Child Component, Render Props, React Elements or Components, ...)

<hr />

[![version][version-badge]][package]
[![MIT License][license-badge]][license]
[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]

[![module formats: umd, cjs, and es][module-formats-badge]][unpkg-dist]
[![umd size][size-badge]][unpkg-dist] [![umd gzip size][gzip-badge]][unpkg-dist]


[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Greenkeeper badge](https://badges.greenkeeper.io/sastan/react-render-callback.svg)](https://greenkeeper.io/)

## The problem

You want your component to support the [`render prop`](https://reactjs.org/docs/render-props.html) pattern
and you want to support several different types of values like
[Function as children](https://reactpatterns.com/#function-as-children),
a [React.Component](https://reactjs.org/docs/react-component.html)
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

- `renderable`: anything that can be rendered like a function, a component, or elements
- `props` (optional): to pass to `renderable`(if renderable is a function or component)

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

// render prop
<Component render={functionComponent} />

// function as a child
<Component>{functionComponent}</Component>

// render Component
<Component render={ClassComponent} />

// component as child
<Component>{ClassComponent}</Component>

// plain childs - nothing to pass down - maybe just doing some lifecycle stuff
<Component><strong>Plain</strong> childs</Component>
```

## Other Solutions

- [`render-props`](https://github.com/donavon/render-props)

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
[gzip-badge]: http://img.badgesize.io/https://unpkg.com/react-render-callback/dist/react-render-callback.umd.min.js?compression=gzip&label=gzip%20size&style=flat-square
[size-badge]: http://img.badgesize.io/https://unpkg.com/react-render-callback/dist/react-render-callback.umd.min.js?label=size&style=flat-square
[unpkg-dist]: https://unpkg.com/react-render-callback/dist/
[module-formats-badge]: https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20es-green.svg?style=flat-square
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
[use-a-render-prop]: https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce
