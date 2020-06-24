import tpl from './index.tpl'
import './index.scss'

import { tplReplace } from '../../../utils/tools'

export default () => {
  return {
    name: 'nav-item',
    tpl (data, field) {
      let strHtml = ''

      data.forEach(item => {
        strHtml += tplReplace(tpl(), {
          navItemClass: item.type === field ? 'nav-item nav-item__active' : 'nav-item',
          itemType: item.type,
          itemText: item.name
        })
      })

      return strHtml
    }
  }
}