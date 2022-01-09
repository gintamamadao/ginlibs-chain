import { Chain } from '../index'

describe('链表 Chain', () => {
  test('链表 Chain push', () => {
    const chain1 = new Chain()
    chain1.push('a')
    expect(chain1.getNodeKeys()).toStrictEqual(expect.objectContaining(['a']))

    const chain2 = new Chain()
    chain2.push('a')
    chain2.push('b')
    expect(chain2.getNodeKeys()).toStrictEqual(
      expect.objectContaining(['a', 'b'])
    )

    const chain3 = new Chain()
    chain3.push('a')
    chain3.push('b')
    chain3.push('c')
    chain3.push('d')
    expect(chain3.getNodeKeys()).toStrictEqual(
      expect.objectContaining(['a', 'b', 'c', 'd'])
    )
  })
  test('链表 Chain pushList', () => {
    const chain1 = new Chain()
    chain1.pushList(['a', 'b', 'c'])
    expect(chain1.getNodeKeys()).toStrictEqual(
      expect.objectContaining(['a', 'b', 'c'])
    )
  })
  test('链表 Chain pop', () => {
    const chain1 = new Chain()
    chain1.pushList(['a', 'b', 'c'])
    chain1.pop()
    expect(chain1.getNodeKeys()).toStrictEqual(
      expect.objectContaining(['a', 'b'])
    )
    chain1.pop()
    expect(chain1.getNodeKeys()).toStrictEqual(expect.objectContaining(['a']))
  })
  test('链表 Chain pushList', () => {
    const chain1 = new Chain()
    chain1.unshift('a')
    chain1.unshift('b')
    expect(chain1.getNodeKeys()).toStrictEqual(
      expect.objectContaining(['b', 'a'])
    )

    const chain2 = new Chain()
    chain2.unshiftList(['a', 'b', 'c'])
    expect(chain2.getNodeKeys()).toStrictEqual(
      expect.objectContaining(['c', 'b', 'a'])
    )
  })
  test('链表 Chain shift', () => {
    const chain1 = new Chain()
    chain1.pushList(['a', 'b', 'c'])
    chain1.shift()
    expect(chain1.getNodeKeys()).toStrictEqual(
      expect.objectContaining(['b', 'c'])
    )
    chain1.shift()
    expect(chain1.getNodeKeys()).toStrictEqual(expect.objectContaining(['c']))
  })
  test('链表 Chain findNext', () => {
    const chain1 = new Chain()
    chain1.pushList(['a', 'b', 'c', 'd'])
    expect(chain1.findNext().key).toStrictEqual('a')
    expect(chain1.findNext('a').key).toStrictEqual('b')
    expect(chain1.findNext('b').key).toStrictEqual('c')
    expect(chain1.findNext('c').key).toStrictEqual('d')
  })
  test('链表 Chain findPrevious', () => {
    const chain1 = new Chain()
    chain1.pushList(['a', 'b', 'c', 'd'])
    expect(chain1.findPrevious('b').key).toStrictEqual('a')
    expect(chain1.findPrevious('c').key).toStrictEqual('b')
    expect(chain1.findPrevious('d').key).toStrictEqual('c')
  })
  test('链表 Chain remove', () => {
    const chain1 = new Chain()
    chain1.pushList(['a', 'b', 'c', 'd'])
    chain1.remove('a')
    expect(chain1.getNodeKeys()).toStrictEqual(
      expect.objectContaining(['b', 'c', 'd'])
    )
    chain1.remove('b')
    expect(chain1.getNodeKeys()).toStrictEqual(
      expect.objectContaining(['c', 'd'])
    )
    chain1.remove('c')
    expect(chain1.getNodeKeys()).toStrictEqual(expect.objectContaining(['d']))

    const chain2 = new Chain()
    chain2.pushList(['a', 'b', 'c', 'd'])
    chain2.remove('c')
    expect(chain2.getNodeKeys()).toStrictEqual(
      expect.objectContaining(['a', 'b', 'd'])
    )

    const chain3 = new Chain()
    chain3.pushList(['a', 'b', 'c', 'd'])
    chain3.remove('b')
    expect(chain3.getNodeKeys()).toStrictEqual(
      expect.objectContaining(['a', 'c', 'd'])
    )
  })
  test('链表 Chain insertBefore', () => {
    const chain1 = new Chain()
    chain1.pushList(['a', 'b', 'c', 'd'])
    chain1.insertBefore('b', 'a1')
    expect(chain1.getNodeKeys()).toStrictEqual(
      expect.objectContaining(['a', 'a1', 'b', 'c', 'd'])
    )

    const chain2 = new Chain()
    chain2.pushList(['a', 'b', 'c', 'd'])
    chain2.insertBefore('a', 'a1')
    expect(chain2.getNodeKeys()).toStrictEqual(
      expect.objectContaining(['a1', 'a', 'b', 'c', 'd'])
    )
  })
  test('链表 Chain insertAfter', () => {
    const chain1 = new Chain()
    chain1.pushList(['a', 'b', 'c', 'd'])
    chain1.insertAfter('b', 'b1')
    expect(chain1.getNodeKeys()).toStrictEqual(
      expect.objectContaining(['a', 'b', 'b1', 'c', 'd'])
    )

    const chain2 = new Chain()
    chain2.pushList(['a', 'b', 'c', 'd'])
    chain2.insertAfter('a', 'b1')
    expect(chain2.getNodeKeys()).toStrictEqual(
      expect.objectContaining(['a', 'b1', 'b', 'c', 'd'])
    )
  })
})
