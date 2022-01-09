import { ChainNode } from './node'
import { isString } from 'ginlibs-type-check'
import { randomStr } from 'ginlibs-utils'

const checkIsInfiniteLoop = (key, keyList) => {
  if (keyList.length > 10000 && keyList.includes(key)) {
    throw new Error('Error: Infinite Loop Chain!')
  }
  return false
}

export class Chain {
  private chainHash = randomStr()
  private head: ChainNode
  public headKey: string = '__chain_head__'
  constructor() {
    this.head = new ChainNode(this.headKey)
    this.head.chainHash = this.chainHash
  }

  getHead() {
    return this.head
  }

  isChainNode(node: ChainNode) {
    if (!node || !node.chainHash) {
      return false
    }
    return this.chainHash === node.chainHash
  }

  find = (anchor: string | ChainNode) => {
    let anchorKey = isString(anchor) ? anchor : anchor.key
    let curNode = this.getHead()
    if (curNode?.key === anchorKey && this.isChainNode(curNode)) {
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

  push = (key: string, payload: any = null) => {
    const node = new ChainNode(key, payload)
    node.chainHash = this.chainHash
    if (this.find(node)) {
      throw new Error('Error: Node exist!')
    }
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
    return this
  }

  pop = () => {
    let prevNode = this.getHead()
    let curNode = prevNode.next
    if (!curNode || !this.isChainNode(curNode)) {
      prevNode.next = null
      return null
    }
    const keyList: string[] = []
    while (curNode.next && this.isChainNode(curNode.next)) {
      prevNode = curNode
      curNode = curNode.next
      if (checkIsInfiniteLoop(curNode.key, keyList)) {
        return
      }
      keyList.push(curNode.key)
    }
    prevNode.next = null
    return curNode
  }

  unshift = (key: string, payload: any = null) => {
    const node = new ChainNode(key, payload)
    node.chainHash = this.chainHash
    if (this.find(node)) {
      throw new Error('Error: Node exist!')
    }
    let head = this.getHead()
    let nextNode = head.next
    head.next = node
    if (this.isChainNode(nextNode)) {
      node.next = nextNode
    }
  }

  shift = () => {
    const head = this.getHead()
    const nextNode = head.next
    if (!nextNode || !this.isChainNode(nextNode)) {
      head.next = null
      return null
    }
    if (nextNode.next && this.isChainNode(nextNode.next)) {
      head.next = nextNode.next
    } else {
      head.next = null
    }
    return nextNode
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

  remove = (anchor: string | ChainNode) => {
    const curNode: any = this.find(anchor)
    if (!curNode) {
      return
    }
    const prevNode = this.findPrevious(curNode)
    if (prevNode) {
      if (this.isChainNode(curNode.next)) {
        prevNode.next = curNode.next
      } else {
        prevNode.next = null
      }
    }
  }

  insertAfter = (
    anchor: string | ChainNode,
    key: string,
    payload: any = null
  ) => {
    const anchorNode = this.find(anchor)
    if (!anchorNode) {
      return
    }
    const node = new ChainNode(key, payload)
    node.chainHash = this.chainHash
    if (this.find(node)) {
      throw new Error('Error: Node exist!')
    }
    const nextNode = anchorNode.next
    anchorNode.next = node
    if (nextNode && this.isChainNode(nextNode)) {
      node.next = nextNode
    }
  }

  insertBefore = (
    anchor: string | ChainNode,
    key: string,
    payload: any = null
  ) => {
    const anchorNode = this.find(anchor)
    if (!anchorNode) {
      return
    }
    const anchorPrevNode = this.findPrevious(anchorNode)
    if (!anchorPrevNode) {
      return
    }
    const node = new ChainNode(key, payload)
    node.chainHash = this.chainHash
    if (this.find(node)) {
      throw new Error('Error: Node exist!')
    }
    anchorPrevNode.next = node
    node.next = anchorNode
  }

  clone = () => {
    const newChain = new Chain()
    let curNode = this.getHead()
    const keyList: string[] = []
    while (curNode.next && this.isChainNode(curNode.next)) {
      curNode = curNode.next
      if (keyList.includes(curNode.key)) {
        return newChain
      }
      keyList.push(curNode.key)
      newChain.push(curNode.key, curNode.payload)
    }
    return newChain
  }

  getNodeKeys = () => {
    let curNode = this.getHead().next
    const keyList: string[] = []
    if (!curNode) {
      return keyList
    }
    keyList.push(curNode.key)
    while (curNode.next && this.isChainNode(curNode.next)) {
      curNode = curNode.next
      keyList.push(curNode.key)
      if (checkIsInfiniteLoop(curNode.key, keyList)) {
        return
      }
      keyList.push(curNode.key)
    }
    return keyList
  }

  checkLength = () => {
    return this.getNodeKeys()
  }
}
