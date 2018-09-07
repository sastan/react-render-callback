import createRender from './createRender'

describe('createRender', () => {
  it('should invoke function with several args', () => {
    const result = Symbol('result')

    const renderable = jest.fn()
    renderable.mockReturnValueOnce(result)

    const render = createRender(renderable)

    expect(render({foo: 'bar'}, 'buz')).toBe(result)

    expect(renderable.mock).toMatchInlineSnapshot(`
Object {
  "calls": Array [
    Array [
      Object {
        "foo": "bar",
      },
      "buz",
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
})
