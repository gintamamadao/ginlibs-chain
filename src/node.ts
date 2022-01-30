export type NodeType = ChainNode | null

export class ChainNode {
  public prev: NodeType = null
  public next: NodeType = null
  public chainHash = ''
  public key = ''
  public payload: any = null
  constructor(key: string, payload: any = null) {
    this.key = key
    this.payload = payload
  }
}
