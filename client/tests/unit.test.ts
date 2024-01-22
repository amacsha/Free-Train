import { expect, it } from 'vitest'

it('toUpperCase', () => {
  const result = 'toUpperCase'
  expect(result).toMatchSnapshot()
})