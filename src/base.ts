import { ChainNode } from './node'
import { isFunc, isString } from 'ginlibs-type-check'
import { randomStr } from 'ginlibs-utils'

export class BaseChain {
  private chainHash = randomStr()
  private head: ChainNode
  public headKey: string = '__chain_head__'
  public length = 0
  constructor() {
    this.head = new ChainNode(this.headKey)
    this.head.chainKey = this.getChainKey(this.headKey)
  }

  getHead() {
    return this.head
  }

  getChainKey = (key: string) => {
    return key + this.chainHash
  }

  push = (key: string, payload: any = null) => {
    const node = new ChainNode(key, payload)
    node.chainKey = this.getChainKey(key)
    let curNode = this.getHead()
    while (curNode?.next) {
      curNode = curNode.next
    }
    curNode.next = node
    this.length++
    return this
  }

  find = (anchor: string | ChainNode) => {
    let anchorKey = isString(anchor) ? anchor : anchor.key
    let aChainKey = this.getChainKey(anchorKey)
    let curNode = this.getHead().next
    if (!curNode) {
      return null
    }
    if (curNode.chainKey === aChainKey) {
      return curNode
    }
    while (curNode.next) {
      curNode = curNode.next
      if (curNode.chainKey === aChainKey) {
        return curNode
      }
    }
    return null
  }

  findNext = (anchor: string | ChainNode, n: number = 1) => {
    let curNode: any = this.find(anchor)
    for (let i = 0; i < n; i++) {
      curNode = curNode?.next
      if (!curNode) {
        return null
      }
    }
    return curNode
  }

  findPrevious = (anchor: string | ChainNode, n = 1) => {
    let anchorNode: ChainNode | null = this.find(anchor)
    if (!anchorNode) {
      return null
    }
    let curNode = this.getHead()
    if (!curNode.next) {
      return null
    }
    const prevNodeList: ChainNode[] = []
    while (curNode.next) {
      prevNodeList.unshift(curNode)
      curNode = curNode.next
      if (curNode.chainKey === anchorNode.chainKey) {
        return prevNodeList[n - 1] ? prevNodeList[n - 1] : null
      }
    }
    return null
  }

  getNodeValues() {
    let curNode = this.head.next
    const values: string[] = []
    if (!curNode) {
      return values
    }
    values.push(curNode.key)
    while (curNode.next) {
      curNode = curNode.next
      values.push(curNode.key)
    }
    return values
  }

  checkLength() {
    let len = 0
    let curNode = this.getHead().next
    if (!curNode) {
      return len
    }
    len++
    while (curNode.next) {
      curNode = curNode.next
      len++
    }
    this.length = len
    return len
  }
}
