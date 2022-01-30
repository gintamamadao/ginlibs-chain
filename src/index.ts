import { Chain as BaseChain } from './chain'

export class Chain extends BaseChain {
  findFuncNode = (func: (nodeVal: string) => boolean) => {
    const keys = this.getNodeKeys()
    const targetKey = keys.find(func)
    if (!targetKey) {
      return null
    }
    return this.find(targetKey)
  }
  findFuncNodes = (func: (nodeVal: string) => boolean) => {
    const keys = this.getNodeKeys()
    const targetKeys = keys.filter(func)
    return targetKeys.map((key) => this.find(key)).filter(Boolean)
  }
}

export default Chain
