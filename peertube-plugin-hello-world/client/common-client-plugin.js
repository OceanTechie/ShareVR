function register ({ registerHook, peertubeHelpers }) {
  registerHook({
    target: 'action:application.init',
    handler: () => onApplicationInit(peertubeHelpers)
  })

  // Videos list

  registerHook({
    target: 'filter:api.videos.list.trending.params',
    handler: params => Object.assign({}, params, { sort: '-views' })
  })

  registerHook({
    target: 'filter:api.videos.list.trending.result',
    handler: result => addSymbolToVideoNameResult(result, '<3')
  })

  registerHook({
    target: 'filter:api.videos.list.local.params',
    handler: params => Object.assign({}, params, { sort: '-views' })
  })

  registerHook({
    target: 'filter:api.videos.list.local.result',
    handler: result => addSymbolToVideoNameResult(result, ':)')
  })

  registerHook({
    target: 'filter:api.videos.list.recently-added.params',
    handler: params => Object.assign({}, params, { filter: 'all-local' })
  })

  registerHook({
    target: 'filter:api.videos.list.recently-added.result',
    handler: result => addSymbolToVideoNameResult(result, 'o/')
  })

  registerHook({
    target: 'filter:api.videos.list.user-subscriptions.params',
    handler: params => Object.assign({}, params, { sort: '-views' })
  })

  registerHook({
    target: 'filter:api.videos.list.user-subscriptions.result',
    handler: result => addSymbolToVideoNameResult(result, ':D')
  })

  // Search list

  registerHook({
    target: 'filter:api.search.videos.list.result',
    handler: result => {
      result.data.forEach(v => v.name += ' SEARCH')

      return {
        total: result.total,
        data: result.data
      }
    }
  })

  registerHook({
    target: 'filter:api.search.video-channels.list.result',
    handler: result => {
      result.data.forEach(v => v.displayName += ' :p')

      return {
        total: result.total,
        data: result.data
      }
    }
  })

}

export {
  register
}

function onApplicationInit (peertubeHelpers) {
  console.log('Hello application world')

  const baseStaticUrl = peertubeHelpers.getBaseStaticRoute()
  const imageUrl = baseStaticUrl + '/images/chocobo.png'

  const topLeftBlock = document.querySelector('.top-left-block')

  topLeftBlock.style.backgroundImage = 'url(' + imageUrl + ')'
}

function addSymbolToVideoNameResult (result, symbol) {
  result.data.forEach(v => v.name += ' ' + symbol)

  return {
    data: result.data,
    total: result.total
  }
}
