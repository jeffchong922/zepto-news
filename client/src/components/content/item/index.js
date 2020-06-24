import tpl_0 from './item-0.tpl'
import tpl_1 from './item-1.tpl'
import tpl_2 from './item-2.tpl'
import tpl_3 from './item-3.tpl'
import tpl_loading from './loading.tpl'

import './index.scss'

import imgLoading from '../../../img/img-loading.gif'

import { tplReplace } from '../../../utils/tools'

export default () => {
  return {
    name: 'contentItem',
    tpl (data, pageNum, loadingOpt) {
      if (!data) return tplReplace(tpl_loading(), loadingOpt)

      let strHtml = '',
          template = ''

      data.forEach((item, index) => {
        if (!item.thumbnail_pic_s) {
          template = tpl_0()
        } else if (item.thumbnail_pic_s && !item.thumbnail_pic_s02) {
          template = tpl_1()
        } else if (item.thumbnail_pic_s02 && !item.thumbnail_pic_s03) {
          template = tpl_2()
        } else if (item.thumbnail_pic_s03) {
          template = tpl_3()
        }

        strHtml += tplReplace(template, {
          imgSrc: imgLoading,
          pageNum,
          index,
          uniquekey: item.uniquekey,
          url: item.url,
          author: item.author_name,
          date: item.date,
          thumbnail_pic_s: item.thumbnail_pic_s,
          thumbnail_pic_s02: item.thumbnail_pic_s02,
          thumbnail_pic_s03: item.thumbnail_pic_s03,
          title: item.title
        })
      })
      
      return strHtml
    }
  }
}