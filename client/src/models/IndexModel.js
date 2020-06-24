import Http from '../utils/Http'
import { API } from '../utils/config'

export default class IndexModel extends Http {
  getNewsList (field, pageCount) {
    return new Promise((resolve, reject) => {
      this.get(
        API.getNews + '?field=' + field,
        'JSONP',
        function (data) {
          const listData = data,
                len = listData.length
  
          let pageData = [],
              index = 0
  
          while (index < len) {
            pageData.push(listData.slice(index, index += pageCount))
          }

          resolve(pageData)
        },
        function () {
          resolve(404)
        }
      )
    })
  }
}