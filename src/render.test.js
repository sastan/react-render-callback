import React from 'react'
import semver from 'semver'

import render from './render'

// eslint-disable-next-line max-lines-per-function
describe('render([renderable[, props]])', () => {
  it('should return null if no args', () => {
    expect(render()).toBeNull()
  })

  if (semver.satisfies(React.version, '>=16.0.0-0')) {
    it('should return strings as is', () => {
      expect(render('div')).toBe('div')
    })

    it('should return array as is', () => {
      const renderable = []
      expect(render(renderable)).toBe(renderable)
    })
  }

  it('should return elements as is', () => {
    const renderable = <div />
    expect(render(renderable)).toBe(renderable)
  })

  if (React.Fragment) {
    it('should return fragments as is', () => {
      const renderable = <React.Fragment />
      expect(render(renderable)).toBe(renderable)
    })
  }

  it('should clone element providing additional props', () => {
    const renderable = <a href="#bar">bar</a>
    expect(render(renderable, {title: 'foo'}, {cloneElement: true}))
      .toMatchInlineSnapshot(`
<a
  href="#bar"
  title="foo"
>
  bar
</a>
`)
  })

  it('should not clone element by default', () => {
    const renderable = <a href="#bar">bar</a>

    expect(
      render(renderable, {
        title: 'foo',
      }),
    ).toBe(renderable)

    expect(
      render(renderable, {
        title: 'foo',
      }),
    ).toMatchInlineSnapshot(`
<a
  href="#bar"
>
  bar
</a>
`)
  })

  describe('should return null for', () => {
    ;[false, null, undefined, true].forEach(value => {
      it(`${value}`, () => {
        expect(render(value)).toBeNull()
      })
    })
  })

  describe('should return value', () => {
    ;['', 0, NaN].forEach(value => {
      it(`${value}`, () => {
        expect(render(value)).toBe(value)
      })
    })
  })
  it('should create an element for an React.Component', () => {
    class Renderable extends React.Component {
      render() {
        return null
      }
    }

    expect(
      render(Renderable, {
        foo: 'bar',
      }),
    ).toMatchInlineSnapshot(`
<Renderable
  foo="bar"
/>
`)
  })

  if (React.createContext) {
    it('should create an element for an React.Context.Provider', () => {
      const {Provider} = React.createContext()
      expect(
        render(Provider, {
          value: 'baz',
        }),
      ).toMatchInlineSnapshot(`
<Context.Provider
  value="baz"
/>
`)
    })

    it('should create an element for an React.Context.Consumer', () => {
      const {Consumer} = React.createContext()
      expect(
        render(Consumer, {
          children: jest.fn(),
        }),
      ).toMatchInlineSnapshot(`
<Context.Consumer>
  [MockFunction]
</Context.Consumer>
`)
    })
  }

  it('should create an element for a factory (React.createFactory)', () => {
    const div = React.createFactory('div')
    expect(
      render(div, {
        title: 'foo',
      }),
    ).toMatchInlineSnapshot(`
<div
  title="foo"
/>
`)
  })

  if (React.forwardRef) {
    it('should create an element for forward ref component (React.forwardRef)', () => {
      const forwardRef = React.forwardRef((props, ref) => (
        <div {...props} ref={ref} />
      ))

      expect(
        render(forwardRef, {
          children: 'foo',
        }),
      ).toMatchInlineSnapshot(`
<ForwardRef>
  foo
</ForwardRef>
`)
    })
  }

  it('should invoke arrow function', () => {
    const props = {foo: 'bar'}

    const renderable = (...args) => args

    expect(render(renderable, props)).toEqual([props])
  })

  it('should invoke function', () => {
    const props = {foo: 'bar'}

    const result = Symbol('result')

    const renderable = jest.fn()
    renderable.mockReturnValueOnce(result)

    expect(render(renderable, props)).toBe(result)

    expect(renderable.mock).toMatchInlineSnapshot(`
Object {
  "calls": Array [
    Array [
      Object {
        "foo": "bar",
      },
    ],
  ],
  "instances": Array [
    undefined,
  ],
  "invocationCallOrder": Array [
    1,
  ],
  "results": Array [
    Object {
      "isThrow": false,
      "value": Symbol(result),
    },
  ],
}
`)

    // should habe passed props as is
    expect(renderable.mock.calls[0][0]).toBe(props)
  })

  it('should invoke function with defaultProps merged', () => {
    const props = {foo: 'bar'}

    const result = Symbol('result')

    const renderable = jest.fn()
    renderable.mockReturnValueOnce(result)
    renderable.defaultProps = {baz: 'buz'}

    expect(render(renderable, props)).toBe(result)
    expect(renderable.mock).toMatchInlineSnapshot(`
Object {
  "calls": Array [
    Array [
      Object {
        "baz": "buz",
        "foo": "bar",
      },
    ],
  ],
  "instances": Array [
    undefined,
  ],
  "invocationCallOrder": Array [
    2,
  ],
  "results": Array [
    Object {
      "isThrow": false,
      "value": Symbol(result),
    },
  ],
}
`)
  })

  describe('should check result of called SFC', () => {
    const SFC = ({value}) => value

    describe('return null for', () => {
      ;[false, null, undefined, true].forEach(value => {
        it(`${value}`, () => {
          expect(
            render(SFC, {
              value,
            }),
          ).toBeNull()
        })
      })
    })

    describe('return value', () => {
      ;['', 0, NaN].forEach(value => {
        it(`${value}`, () => {
          expect(
            render(SFC, {
              value,
            }),
          ).toBe(value)
        })
      })
    })
  })

  it('should invoke function with plain value', () => {
    const result = Symbol('result')

    const renderable = jest.fn()
    renderable.mockReturnValueOnce(result)

    expect(render(renderable, 23)).toBe(result)
    expect(renderable.mock).toMatchInlineSnapshot(`
Object {
  "calls": Array [
    Array [
      23,
    ],
  ],
  "instances": Array [
    undefined,
  ],
  "invocationCallOrder": Array [
    3,
  ],
  "results": Array [
    Object {
      "isThrow": false,
      "value": Symbol(result),
    },
  ],
}
`)
  })

  describe('in development', () => {
    it('should create an element for a function if propTypes are set', () => {
      function Renderable() {}
      Renderable.propTypes = {}

      expect(
        render(Renderable, {
          foo: 'bar',
        }),
      ).toMatchInlineSnapshot(`
<Renderable
  foo="bar"
/>
`)
    })

    it('should create an element for an arrow function if propTypes are set', () => {
      const Renderable = () => {}
      Renderable.propTypes = {}

      expect(
        render(Renderable, {
          foo: 'bar',
        }),
      ).toMatchInlineSnapshot(`
<Renderable
  foo="bar"
/>
`)
    })
  })
})
