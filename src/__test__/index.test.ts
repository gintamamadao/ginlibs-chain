import { Chain } from '../index'

describe('链表 Chain', () => {
  // test('链表 Chain push', () => {
  //   const chain1 = new Chain()
  //   chain1.push('a')
  //   expect(chain1.getNodeKeys()).toStrictEqual(expect.objectContaining(['a']))

  //   const chain2 = new Chain()
  //   chain2.push('a')
  //   chain2.push('b')
  //   expect(chain2.getNodeKeys()).toStrictEqual(
  //     expect.objectContaining(['a', 'b'])
  //   )

  //   const chain3 = new Chain()
  //   chain3.push('a')
  //   chain3.push('b')
  //   chain3.push('c')
  //   chain3.push('d')
  //   expect(chain3.getNodeKeys()).toStrictEqual(
  //     expect.objectContaining(['a', 'b', 'c', 'd'])
  //   )
  // })
  // test('链表 Chain pushList', () => {
  //   const chain1 = new Chain()
  //   chain1.pushList(['a', 'b', 'c'])
  //   expect(chain1.getNodeKeys()).toStrictEqual(
  //     expect.objectContaining(['a', 'b', 'c'])
  //   )
  // })
  // test('链表 Chain pop', () => {
  //   const chain1 = new Chain()
  //   chain1.pushList(['a', 'b', 'c'])
  //   chain1.pop()
  //   expect(chain1.getNodeKeys()).toStrictEqual(
  //     expect.objectContaining(['a', 'b'])
  //   )
  //   chain1.pop()
  //   expect(chain1.getNodeKeys()).toStrictEqual(expect.objectContaining(['a']))
  // })
  // test('链表 Chain pushList', () => {
  //   const chain1 = new Chain()
  //   chain1.unshift('a')
  //   chain1.unshift('b')
  //   expect(chain1.getNodeKeys()).toStrictEqual(
  //     expect.objectContaining(['b', 'a'])
  //   )

  //   const chain2 = new Chain()
  //   chain2.unshiftList(['a', 'b', 'c'])
  //   expect(chain2.getNodeKeys()).toStrictEqual(
  //     expect.objectContaining(['c', 'b', 'a'])
  //   )
  // })
  // test('链表 Chain shift', () => {
  //   const chain1 = new Chain()
  //   chain1.pushList(['a', 'b', 'c'])
  //   chain1.shift()
  //   expect(chain1.getNodeKeys()).toStrictEqual(
  //     expect.objectContaining(['b', 'c'])
  //   )
  //   chain1.shift()
  //   expect(chain1.getNodeKeys()).toStrictEqual(expect.objectContaining(['c']))
  // })
  test('链表 Chain findNext', () => {
    const chain1 = new Chain()
    chain1.pushList(['a', 'b', 'c', 'd'])
    expect(chain1.findNext().key).toStrictEqual('a')
    expect(chain1.findNext('a').key).toStrictEqual('b')
    expect(chain1.findNext('b').key).toStrictEqual('c')
    expect(chain1.findNext('c').key).toStrictEqual('d')
  })
})
