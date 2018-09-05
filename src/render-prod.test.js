describe('render([renderable[, props]])', () => {
  describe('in production', () => {
    let render
    beforeAll(async () => {
      process.env.NODE_ENV = 'production'

      const mod = await import('./render')

      render = mod.default
    })

    it('should invoke function altough propTypes are set', () => {
      function Renderable(...args) {
        return args
      }
      Renderable.propTypes = {}
      Renderable.defaultProps = {baz: 'buz'}

      expect(render(Renderable, {foo: 'bar'})).toMatchInlineSnapshot(`
Array [
  Object {
    "baz": "buz",
    "foo": "bar",
  },
]
`)
    })

    it('should invoke an arrow function altough propTypes are set', () => {
      const Renderable = (...args) => args
      Renderable.propTypes = {}
      Renderable.defaultProps = {baz: 'buz'}

      expect(render(Renderable, {foo: 'bar'})).toMatchInlineSnapshot(`
Array [
  Object {
    "baz": "buz",
    "foo": "bar",
  },
]
`)
    })
  })
})
