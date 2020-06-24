import dot from '../components/dot'
const dotComponent = dot()

const BASE_URL = 'http://localhost:8848'
const API = {
  getNews: BASE_URL + '/tt-news/get-news',
}

const OPT = {
  DEFAULT_FIELD: 'top',
  DEFAULT_PAGE_ITEM_LEN: 10,
  INDEX_HEADER_PARAMS: {
    title: '新闻头条',
    showLeftIcon: false,
    showRightIcon: true,
    rightIconClass: 'icon-cc-book'
  },
  COLLECTION_HEADER_PARAMS: {
    title: '新闻收藏',
    showLeftIcon: true,
    showRightIcon: false,
    rightIconClass: 'icon-cc-book'
  },
  DETAIL_HEADER_PARAMS: {
    title: '新闻详情',
    showLeftIcon: true,
    showRightIcon: true,
    rightIconClass: 'icon-cc-copy'
  },
  INDEX_LOADING_OPT: {
    iconClass: 'icon-cc-question-circle',
    text: '正在加载中',
    dot: dotComponent.tpl()
  },
  COLLECTION_LOADING_OPT: {
    iconClass: 'icon-cc-book',
    text: '暂无收藏文章',
    dot: ''
  },
  ERROR_LOADING_OPT: {
    iconClass: 'icon-cc-question-circle',
    text: '崩溃啦，请刷新',
    dot: ''
  }
}

export {
  API,
  OPT
}