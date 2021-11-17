import { ChainNode } from './node'
import { BaseChain } from './base'
import { isString } from 'ginlibs-type-check'

export function push(this: BaseChain, value: string | ChainNode) {
  const node = isString(value) ? new ChainNode(value) : value
  let curNode = this.head
  while (curNode?.next) {
    curNode = curNode.next
  }
  curNode.next = node
  this.length++
  return this
}
