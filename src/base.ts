import { ChainNode } from './node'
import { isString } from 'ginlibs-type-check'
import { randomStr } from 'ginlibs-utils'

const checkIsInfiniteLoop = (key, keyList) => {
  if (keyList.length > 10000 && keyList.includes(key)) {
    throw new Error('invalid chain')
  }
  return false
}

export class BaseChain {
  private chainHash = randomStr()
  private head: ChainNode
  public headKey: string = '__chain_head__'
  public length = 0
  constructor() {
    this.head = new ChainNode(this.headKey)
    this.head.chainHash = this.chainHash
  }

  getHead() {
    return this.head
  }

  isChainNode(node: ChainNode) {
    return this.chainHash === node.chainHash
  }

  push = (key: string, payload: any = null) => {
    const node = new ChainNode(key, payload)
    node.chainHash = this.chainHash
    let curNode = this.getHead()
    const keyList: string[] = []
    while (curNode?.next && this.isChainNode(curNode.next)) {
      curNode = curNode.next
      if (checkIsInfiniteLoop(curNode.key, keyList)) {
        return
      }
      keyList.push(curNode.key)
    }
    curNode.next = node
    this.length++
    return this
  }

  find = (anchor: string | ChainNode) => {
    let anchorKey = isString(anchor) ? anchor : anchor.key
    let curNode = this.getHead()
    if (curNode?.key === anchorKey) {
      return curNode
    }
    const keyList: string[] = []
    while (curNode?.next && this.isChainNode(curNode.next)) {
      curNode = curNode.next
      if (curNode.key === anchorKey) {
        return curNode
      }
      if (checkIsInfiniteLoop(curNode.key, keyList)) {
        return
      }
      keyList.push(curNode.key)
    }
    return null
  }

  findNext = (anchor: string | ChainNode, n: number = 1) => {
    let curNode: any = this.find(anchor)
    for (let i = 0; i < n; i++) {
      curNode = curNode?.next
      if (!curNode || !this.isChainNode(curNode.next)) {
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
    const keyList: string[] = []
    while (curNode.next && this.isChainNode(curNode.next)) {
      prevNodeList.unshift(curNode)
      curNode = curNode.next
      if (curNode.key === anchorNode.key) {
        return prevNodeList[n - 1] ? prevNodeList[n - 1] : null
      }
      if (checkIsInfiniteLoop(curNode.key, keyList)) {
        return
      }
      keyList.push(curNode.key)
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
    let curNode = this.getHead()
    if (!curNode.next) {
      return len
    }
    len++
    const keyList: string[] = []
    while (curNode.next && this.isChainNode(curNode.next)) {
      curNode = curNode.next
      len++
      if (checkIsInfiniteLoop(curNode.key, keyList)) {
        return
      }
      keyList.push(curNode.key)
    }
    this.length = len
    return len
  }
}
