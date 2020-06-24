import tpl from './index.tpl'
import './index.scss'
import navItem from './item'

import { tplReplace } from '../../utils/tools'

export default () => {
  const navItemComponent = navItem()
  return {
    name: 'nav',
    tpl (data, field) {
      const navListWidth = (6 * data.length) + 'rem'
      return tplReplace(tpl(), {
        navListWidth,
        navItem: navItemComponent.tpl(data, field)
      })
    }
  }
}