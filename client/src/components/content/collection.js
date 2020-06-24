import tpl from './index.tpl'
import './collection.scss'

import item from './item'

import { tplReplace } from '../../utils/tools'
import { OPT } from '../../utils/config'

export default () => {
  const itemComponent = item()
        
  return {
    name: 'content',
    tpl (data) {
      const loadingOpt = OPT.COLLECTION_LOADING_OPT
      return tplReplace(tpl(), {
        item: itemComponent.tpl(data, '', loadingOpt)
      })
    }
  }
}