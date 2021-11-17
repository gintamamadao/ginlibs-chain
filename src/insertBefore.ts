import { BaseChain } from './base'
import { ChainNode } from './node'
import { isString } from 'ginlibs-type-check'

export function insertBefore(this: BaseChain, value: string | ChainNode, anchor: string) {
  const anchorNode = this.find(anchor)
  if (!anchorNode) {
    return false
  }
  const anchorPrevNode = this.findPrevious(anchor) || this.head
  const node = isString(value) ? new ChainNode(value) : value
  node.next = anchorNode
  anchorPrevNode.next = node
  this.length++
  return true
}
