export type NodeType = ChainNode | null

export class ChainNode {
  public next: NodeType = null
  public value: string
  constructor(value: string, next: NodeType = null) {
    this.value = value
    this.next = next
  }
}
