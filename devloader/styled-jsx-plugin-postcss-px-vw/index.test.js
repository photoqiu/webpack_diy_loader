let postcss = require('postcss')

let plugin = require('./')

async function run (input, output) {
  let result = await postcss([plugin]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('sets width and height', async () => {
  await run('a{ size: 1px 2px; }', 'a{ width: 1px; height: 2px; }')
})