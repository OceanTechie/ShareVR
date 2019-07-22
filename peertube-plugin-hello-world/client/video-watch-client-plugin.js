function register ({ registerHook, peertubeHelpers }) {
  registerHook({
    target: 'action:video-watch.init',
    handler: () => console.log('Hello video watch world')
  })
}

export {
  register
}
