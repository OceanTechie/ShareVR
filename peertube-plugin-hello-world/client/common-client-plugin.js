function register ({ registerHook, peertubeHelpers }) {
  registerHook({
    target: 'action:application.init',
    handler: () => onApplicationInit(peertubeHelpers)
  })

  // Videos list

  registerHook({
    target: 'filter:api.trending-videos.videos.list.params',
    handler: params => Object.assign({}, params, { sort: '-views' })
  })

  registerHook({
    target: 'filter:api.trending-videos.videos.list.result',
    handler: result => addSymbolToVideoNameResult(result, '<3')
  })

  registerHook({
    target: 'filter:api.local-videos.videos.list.params',
    handler: params => Object.assign({}, params, { sort: '-views' })
  })

  registerHook({
    target: 'filter:api.local-videos.videos.list.result',
    handler: result => addSymbolToVideoNameResult(result, ':)')
  })

  registerHook({
    target: 'filter:api.recently-added-videos.videos.list.params',
    handler: params => Object.assign({}, params, { filter: 'all-local' })
  })

  registerHook({
    target: 'filter:api.recently-added-videos.videos.list.result',
    handler: result => addSymbolToVideoNameResult(result, 'o/')
  })

  registerHook({
    target: 'filter:api.user-subscriptions-videos.videos.list.params',
    handler: params => Object.assign({}, params, { sort: '-views' })
  })

  registerHook({
    target: 'filter:api.user-subscriptions-videos.videos.list.result',
    handler: result => addSymbolToVideoNameResult(result, ':D')
  })

  registerHook({
    target: 'filter:internal.common.svg-icons.get-content.result',
    handler: (result, params) => {
      if (params.name === 'syndication') {
        return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50"/></svg>'
      }

      return result
    }
  })

  // Router hooks

  registerHook({
    target: 'action:router.navigation-end',
    handler: params => console.log('New URL! %s.', params.path)
  })

  // Fake hook

  registerHook({
    target: 'fakeHook',
    handler: () => console.log('fake hook')
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

  peertubeHelpers.translate('User name')
   .then(translation => console.log('Translated User name by ' + translation))
}

function addSymbolToVideoNameResult (result, symbol) {
  result.data.forEach(v => v.name += ' ' + symbol)

  return {
    data: result.data,
    total: result.total
  }
}
