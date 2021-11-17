import { BaseChain } from './base'
import { ChainNode } from './node'
import { isString } from 'ginlibs-type-check'

export function insertAfter(this: BaseChain, value: string | ChainNode, anchor: string) {
  const anchorNode = this.find(anchor)
  if (!anchorNode) {
    return false
  }
  const node = isString(value) ? new ChainNode(value) : value
  node.next = anchorNode.next
  anchorNode.next = node
  this.length++
  return true
}
