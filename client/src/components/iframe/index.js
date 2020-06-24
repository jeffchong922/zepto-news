import tpl from './index.tpl'
import './index.scss'

import { tplReplace } from '../../utils/tools'

export default () => {
  return {
    name: 'detailIframe',
    tpl (url) {
      return tplReplace(tpl(), {
        new_url: url
      })
    }
  }
}