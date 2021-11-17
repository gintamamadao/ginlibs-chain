import { BaseChain } from './base'
import { ChainNode } from './node'
import { isString } from 'ginlibs-type-check'

export function remove(this: BaseChain, value: string | ChainNode) {
  const nodeVal = isString(value) ? value : value.value
  const curNode = this.find(nodeVal)
  if (!curNode) {
    return false
  }
  const prevNode = this.findPrevious(nodeVal)
  if (!prevNode) {
    this.head.next = curNode.next
  } else {
    prevNode.next = curNode.next
  }
  this.length--
}
