function register ({ registerHook, peertubeHelpers }) {
  registerHook({
    target: 'action:application.loaded',
    handler: () => onApplicationLoaded(peertubeHelpers)
  })
}

export {
  register
}

function onApplicationLoaded (peertubeHelpers) {
  console.log('Hello application world')

  const baseStaticUrl = peertubeHelpers.getBaseStaticRoute()
  const imageUrl = baseStaticUrl + '/images/chocobo.png'

  const topLeftBlock = document.querySelector('.top-left-block')

  topLeftBlock.style.backgroundImage = 'url(' + imageUrl + ')'
}
