import tpl from './index.tpl'
import './index.scss'

import { tplReplace } from '../../utils/tools'

export default () => {
  return {
    name: 'header',
    tpl (options) {
      return tplReplace(tpl(), {
        title: options.title,
        leftIconDisStyle: options.showLeftIcon || 'none',
        rightIconDisStyle: options.showRightIcon || 'none',
        rightIconClass: options.rightIconClass
      })
    }
  }
}