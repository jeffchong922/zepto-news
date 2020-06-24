import tpl from './index.tpl'
import './index.scss'

import item from './item'

import { tplReplace } from '../../utils/tools'
import { OPT } from '../../utils/config'

export default () => {
  const itemComponent = item()
        
  return {
    name: 'content',
    tpl (data, pageNum) {
      const loadingOpt = OPT.INDEX_LOADING_OPT
      return tplReplace(tpl(), {
        item: itemComponent.tpl(data, pageNum, loadingOpt)
      })
    }
  }
}