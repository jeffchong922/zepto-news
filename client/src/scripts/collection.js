import '../styles/collection.scss'

import header from '../components/header'
import content from '../components/content/collection'

import LazyLoad from '../modules/LazyLoad'
import HeaderBar from '../modules/HeaderBar'
import CollectionList from '../modules/CollectionList'

import { OPT } from '../utils/config'
import { getQueryData } from '../utils/tools'
;(($) => {
  const $app = $('#app'),
        $container = $('<div class="container">')

  const headerComponent = header(),
        contentComponent = content()

  const field = getQueryData('field') || OPT.DEFAULT_FIELD

  function init () {
    render()
    loadModules()
  }

  function render () {
    _renderHeader(OPT.COLLECTION_HEADER_PARAMS)
    _renderContent()
    $app.append($container)
  }

  function _renderHeader (options) {
    $container.append(headerComponent.tpl(options))
  }

  function _renderContent () {
    $container.append(contentComponent.tpl())
  }

  function loadModules () {
    const lazyLoadInstance = new LazyLoad('.lazy-img')
    lazyLoadInstance.init()

    const collectionListInstance = new CollectionList($, lazyLoadInstance)
    collectionListInstance.init()

    new HeaderBar($, 'collection', {
      field
    }).init()
  }

  init()
})(Zepto)