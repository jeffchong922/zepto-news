import '../styles/collection.scss'

import header from '../components/header'
import iframe from '../components/iframe'

import HeaderBar from '../modules/HeaderBar'

import { OPT } from '../utils/config'
import { getQueryData } from '../utils/tools'
import storage from '../utils/storage'
;(($) => {
  const $app = $('#app'),
        $container = $('<div class="container">')

  const headerComponent = header(),
        iframeComponent = iframe()

  const newsData = storage.getItem('news-data', 'session'),
        newsUrl = getQueryData('news_url') || newsData.url,
        uniqueKey = getQueryData('uniquekey') || newsData.uniquekey,
        redirect = getQueryData('redirect') || 'index',
        field = getQueryData('field') || 'top'

  function init () {
    render()
    loadModules()
  }

  function render () {
    _renderHeader(OPT.DETAIL_HEADER_PARAMS)
    _renderIframe(newsUrl)
    $app.append($container)
  }

  function _renderHeader (options) {
    $container.append(headerComponent.tpl(options))
  }

  function _renderIframe (url) {
    $container.append(iframeComponent.tpl(url))
  }

  function loadModules () {
    new HeaderBar($, 'detail', {
      uniqueKey,
      redirect,
      field
    }).init()
  }

  init()
})(Zepto)