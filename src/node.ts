export type NodeType = ChainNode | null

export class ChainNode {
  public next: NodeType = null
  public value: string
  public payload: any = null
  constructor(value: string, next: NodeType = null, payload: any = null) {
    this.value = value
    this.next = next
    this.payload = payload
  }
}
