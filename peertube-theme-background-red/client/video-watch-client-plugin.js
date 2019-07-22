function register ({ registerHook, peertubeHelpers }) {
  registerHook({
    target: 'action:video-watch.init',
    handler: () => console.log('Background red watch world')
  })
}

export {
  register
}
