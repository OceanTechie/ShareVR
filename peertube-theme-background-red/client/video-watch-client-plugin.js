function register ({ registerHook, peertubeHelpers }) {
  registerHook({
    target: 'action:video-watch.loaded',
    handler: () => console.log('Background red watch world')
  })
}

export {
  register
}
