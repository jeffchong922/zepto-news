import tpl from './index.tpl'
import dot from '../dot'
import './index.scss'

import { tplReplace } from '../../utils/tools'

export default () => {
  const dotComponent = dot()
  return {
    name: 'bottomTip',
    tpl (isLoading, text) {
      return tplReplace(tpl(), {
        isLoading: isLoading ? dotComponent.tpl() : '',
        tip: text
      })
    }
  }
}