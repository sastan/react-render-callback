import React from 'react'

import render from './render'

// eslint-disable-next-line max-lines-per-function
describe('render([renderable[, props]])', () => {
  it('should return null if no args', () => {
    expect(render()).toBeNull()
  })

  it('should return strings as is', () => {
    expect(render('div')).toBe('div')
  })

  it('should return array as is', () => {
    const renderable = []
    expect(render(renderable)).toBe(renderable)
  })

  it('should return elements as is', () => {
    const renderable = <div />
    expect(render(renderable)).toBe(renderable)
  })

  it('should return fragments as is', () => {
    const renderable = <React.Fragment />
    expect(render(renderable)).toBe(renderable)
  })

  describe('should return null for', () => {
    ;[false, null, undefined, NaN, ''].forEach(value => {
      it(`${value}`, () => {
        expect(render(value)).toBeNull()
      })
    })
  })

  describe('should return value', () => {
    ;[true, 0].forEach(value => {
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

    expect(render(Renderable, {foo: 'bar'})).toMatchInlineSnapshot(`
<Renderable
  foo="bar"
/>
`)
  })

  it('should create an element for an React.Context.Provider', () => {
    const {Provider} = React.createContext()
    expect(render(Provider, {value: 'baz'})).toMatchInlineSnapshot(`
<Context.Provider
  value="baz"
/>
`)
  })

  it('should create an element for an React.Context.Consumer', () => {
    const {Consumer} = React.createContext()
    expect(render(Consumer, {children: jest.fn()})).toMatchInlineSnapshot(`
<Context.Consumer>
  [MockFunction]
</Context.Consumer>
`)
  })

  it('should create an element for a factory (React.createFactory)', () => {
    const div = React.createFactory('div')
    expect(render(div, {title: 'foo'})).toMatchInlineSnapshot(`
<div
  title="foo"
/>
`)
  })

  it('should create an element for forward ref component (React.forwardRef)', () => {
    const forwardRef = React.forwardRef((props, ref) => (
      <div {...props} ref={ref} />
    ))

    expect(render(forwardRef, {children: 'foo'})).toMatchInlineSnapshot(`
<ForwardRef>
  foo
</ForwardRef>
`)
  })

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
      ;[false, null, undefined, NaN, ''].forEach(value => {
        it(`${value}`, () => {
          expect(render(SFC, {value})).toBeNull()
        })
      })
    })

    describe('return value', () => {
      ;[true, 0].forEach(value => {
        it(`${value}`, () => {
          expect(render(SFC, {value})).toBe(value)
        })
      })
    })
  })

  describe('in development', () => {
    it('should create an element for a function if propTypes are set', () => {
      function Renderable() {}
      Renderable.propTypes = {}

      expect(render(Renderable, {foo: 'bar'})).toMatchInlineSnapshot(`
<Renderable
  foo="bar"
/>
`)
    })

    it('should create an element for an arrow function if propTypes are set', () => {
      const Renderable = () => {}
      Renderable.propTypes = {}

      expect(render(Renderable, {foo: 'bar'})).toMatchInlineSnapshot(`
<Renderable
  foo="bar"
/>
`)
    })
  })
})
