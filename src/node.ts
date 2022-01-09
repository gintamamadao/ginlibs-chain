export type NodeType = ChainNode | null

export class ChainNode {
  public prev: NodeType = null
  public next: NodeType = null
  public chainKey: string = ''
  public key: string = ''
  public payload: any = null
  constructor(key: string, payload: any = null) {
    this.key = key
    this.payload = payload
  }
}
